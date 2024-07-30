import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function List() {
    const [bills, setBills] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchCategory, setSearchCategory] = useState("");

    useEffect(() => {
        getAll();
        fetchCategories();
    }, []);

  


    const getAll = async () => {
        try {
            const rep = await axios.get(`http://localhost:8080/bills?_sort=price`);
            setBills(rep.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/products`);
            setProducts(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirm = window.confirm("Bạn muốn sản phẩm  này?");
            if (confirm) {
                await axios.delete(`http://localhost:8080/bills/${id}`);
                toast.success("Xóa sản phẩm thành công");
                getAll();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearch = () => {
        const results = bills.filter(bill => {
            const matchesTitle = bill.product.name.toLowerCase().includes(searchTitle.toLowerCase());
            const matchesCategory = searchCategory ? bill.product.name === searchCategory : true;
            return matchesTitle && matchesCategory;
        });

        return results.length > 0 ? results : "Không có kết quả";
    };

    let searchResults = handleSearch();

    if(Array.isArray(searchResults)) {
        searchResults = searchResults.sort((a, b) => a.product.price - b.product.price);
      }

    return (
        <div className={'d-flex flex-column justify-content-center align-items-center bg-light vh-100'}>
            <h1>Hệ Thống Quản Lý Đơn Hàng</h1>
            <div className={'w-75 rounded bg-white border shadow p-4'}>
                <div className={'d-flex justify-content-between mb-3'}>
                    <div>
                        <label htmlFor="searchTitle" className="form-label">Tên sản phẩm</label>
                        <input
                            type="text"
                            className="form-control"
                            id="searchTitle"
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="searchCategory" className="form-label">Thể loại</label>
                        <select
                            className="form-select"
                            id="searchCategory"
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                        >
                            <option value="">Tất cả</option>
                            {products.map(product => (
                                <option key={product.id} value={product.name}>{product.name}</option>
                            ))}
                        </select>
                    </div>
                    <Link to={'/create'} className={'btn btn-success align-self-end'}>Thêm Mới</Link>
                </div>
                {Array.isArray(searchResults) ? (
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã đơn hàng</th>
                                <th>Tên sản phẩm</th>
                                <th>Ngày mua</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Tổng tiền</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults.map((bill, index) => (
                                <tr key={bill.id}>
                                    <td>{index + 1}</td> 
                                    <td>{bill.id}</td>
                                    <td>{bill.product.name}</td>
                                    <td>{new Date(bill.dateAdded.split('/').reverse().join('-')).toLocaleDateString('vi-VN')}</td>
                                    <td>{bill.product.price}</td>
                                    <td>{bill.quantity}</td>
                                    <td>{bill.product.price * bill.quantity }</td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(bill.id)}
                                            className="btn btn-danger"
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>{searchResults}</p>
                )}
            </div>
        </div>
    );
}

export default List;




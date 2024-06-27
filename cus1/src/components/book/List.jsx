import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function List() {
    const [books, setBook] = useState([]);

    const formattedBooks = books.map(book => ({
        ...book,
        dateAdded: new Date(book.dateAdded.split('/').reverse().join('-'))
    })).sort((a, b) => a.quantity + b.quantity);

    useEffect(() => {
        getAll();
    }, []);


    const getAll = async () => {
        try {
            const rep = await axios.get(`http://localhost:8080/books`)
            setBook(rep.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            const comfir = window.confirm("Bạn muốn xóa sách quyển sách này ?");
            if (comfir) {
                await axios.delete(`http://localhost:8080/books/${id}`);
                toast.success("Xóa sách thành công");
                getAll();
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className={'d-flex flex-column justify-content-center align-items-center bg-light vh-100'}>
            <h1>Hệ Thống Quản Lý Sách</h1>
            <div className={'w-75 rounded bg-white border shadow p-4'}>
                <div className={'d-flex justify-content-end'}>
                    <Link to={'/create'} className={'btn btn-success'}>Thêm Mới</Link>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Mã sách</th>
                            <th>Tên sách</th>
                            <th>Thể loại</th>
                            <th>Ngày nhập</th>
                            <th>Số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formattedBooks.map(book => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.category.name}</td>
                                <td>{book.dateAdded.toLocaleDateString('vi-VN')}</td>
                                <td>{book.quantity}</td>
                                <td>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(book.id)}
                                    className="btn btn-danger"
                                >
                                    delete
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default List;
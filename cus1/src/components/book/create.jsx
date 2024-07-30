import React, { useEffect, useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Create = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const getAllCate = async () => {
        try {
            const rep = await axios.get(`http://localhost:8080/products`);
            setProducts(rep.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllCate();
    }, []);

    const handlSubmit = async (values) => {
        try {
            const cate = JSON.parse(values.product);
            values.product = cate;
            await axios.post('http://localhost:8080/bills', values);
            toast.success("Thêm mới sản phẩm thành công.");
            navigate('/bill');
        } catch (err) {
            console.log(err);
        }
    };

    const validationSchema = Yup.object({
        dateAdded: Yup.date()
            .max(new Date(), "Ngày nhập sách không được lớn hơn ngày hiện tại.")
            .required("Ngày nhập sách là bắt buộc."),
        quantity: Yup.number()
            .integer("Số lượng phải là số nguyên.")
            .positive("Số lượng phải lớn hơn 0.")
            .required("Số lượng là bắt buộc."),
            product: Yup.string().required("Sản Phẩm là bắt buộc."),
    });

    return (
        <div className={'d-flex w-100 justify-content-center align-items-center bg-light'}>
            <div className={'w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'}>
                <h1>Thêm Mới Đơn Hàng</h1>
                <Formik
                    initialValues={{
                        product: "",
                        dateAdded: "",
                        quantity: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handlSubmit(values);
                    }}
                >
                    <Form>
                        <div className="form-group">
                            <label>Ngày mua</label>
                            <Field type="date" name="dateAdded" className="form-control" />
                            <ErrorMessage name="dateAdded" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label>Số lượng</label>
                            <Field type="number" name="quantity" className="form-control" />
                            <ErrorMessage name="quantity" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label>Tên sản phẩm</label>
                            <Field as="select" name="product" className="form-control">
                                <option value="" label="Hãy lựa chọn sản phẩm" />
                                {products.map(product => (
                                    <option key={product.id} value={JSON.stringify(product)}>
                                        {product.name}  
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="category" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className={'btn btn-success'}>Thêm Mới</button>
                        <Link to={'/bill'} className={'btn btn-primary m-3'}>Về Trang Chủ</Link>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Create;

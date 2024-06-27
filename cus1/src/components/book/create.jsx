import React, { useEffect, useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Create = () => {
    const [category, setCategories] = useState([]);
    const navigate = useNavigate();

    const getAllCate = async () => {
        try {
            const rep = await axios.get(`http://localhost:8080/categories`);
            setCategories(rep.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllCate();
    }, []);

    const handlSubmit = async (values) => {
        try {
            const cate = JSON.parse(values.category);
            values.category = cate;

            await axios.post('http://localhost:8080/books', values);
            toast.success("Thêm mới sách thành công.");
            navigate('/books');
        } catch (err) {
            console.log(err);
        }
    };

    const validationSchema = Yup.object({
        id: Yup.string()
            .matches(/^BO-\d{4}$/, "Mã sách phải đúng định dạng BO-XXXX.")
            .required("Mã sách là bắt buộc."),
        title: Yup.string()
            .max(100, "Tên sách không được dài quá 100 ký tự.")
            .required("Tên sách là bắt buộc."),
        dateAdded: Yup.date()
            .max(new Date(), "Ngày nhập sách không được lớn hơn ngày hiện tại.")
            .required("Ngày nhập sách là bắt buộc."),
        quantity: Yup.number()
            .integer("Số lượng phải là số nguyên.")
            .positive("Số lượng phải lớn hơn 0.")
            .required("Số lượng là bắt buộc."),
        category: Yup.string().required("Thể loại là bắt buộc."),
    });

    return (
        <div className={'d-flex w-100 justify-content-center align-items-center bg-light'}>
            <div className={'w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'}>
                <h1>Thêm Mới Sách</h1>
                <Formik
                    initialValues={{
                        id: "",
                        title: "",
                        category: "",
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
                            <label>Mã sách</label>
                            <Field type="text" name="id" className="form-control" />
                            <ErrorMessage name="id" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label>Tên sách</label>
                            <Field type="text" name="title" className="form-control" />
                            <ErrorMessage name="title" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label>Ngày nhập sách</label>
                            <Field type="date" name="dateAdded" className="form-control" />
                            <ErrorMessage name="dateAdded" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label>Số lượng</label>
                            <Field type="text" name="quantity" className="form-control" />
                            <ErrorMessage name="quantity" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label>Thể Loại</label>
                            <Field as="select" name="category" className="form-control">
                                <option value="" label="Hãy lựa chọn thể loại" />
                                {category.map(category => (
                                    <option key={category.id} value={JSON.stringify(category)}>
                                        {category.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="category" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className={'btn btn-success'}>Thêm Mới</button>
                        <Link to={'/books'} className={'btn btn-primary m-3'}>Về Trang Chủ</Link>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Create;

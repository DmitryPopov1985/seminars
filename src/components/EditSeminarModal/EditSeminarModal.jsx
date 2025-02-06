import React from 'react';
import { Formik, Form, Field } from 'formik'; // Импортируем необходимые компоненты из библиотеки Formik
import Modal from 'react-modal'; // Импортируем компонент модального окна
import styles from './EditSeminarModal.module.css';

// Компонент EditSeminarModal принимает следующие пропсы:
// isOpen - открыто ли модальное окно
// onRequestClose - функция для закрытия модального окна
// initialValues - начальные значения формы, которые передаются в Formik
// onSubmit - функция для обработки отправки формы
const EditSeminarModal = ({ isOpen, onRequestClose, initialValues, onSubmit }) => {
    return (
        // Открытие модального окна в зависимости от значения isOpen
        // Передаем функцию onRequestClose для обработки событий закрытия
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.modalContainer}
            overlayClassName={styles.modalOverlay}
        >

            <h2 className={styles.modalHeader}>Редактировать семинар</h2>


            <Formik
                initialValues={initialValues} // Устанавливаем начальные значения формы
                onSubmit={(values) => {
                    onSubmit(values); // Обрабатываем отправку формы
                    onRequestClose(); // Закрываем модальное окно после отправки
                }}
            >
                {({ handleSubmit }) => (
                    // HTML-форма для редактирования семинара
                    <Form onSubmit={handleSubmit}>
                        {/* Поле для ввода названия семинара */}
                        <div className={styles.formField}>
                            <label htmlFor="title">Название:</label>
                            <Field name="title" type="text" required /> {/* Поле ввода с типом текст */}
                        </div>

                        {/* Поле для ввода описания семинара */}
                        <div className={styles.formField}>
                            <label htmlFor="description">Описание:</label>
                            <Field name="description" as="textarea" required /> {/* Поле ввода с типом текстовое поле */}
                        </div>

                        {/* Поле для выбора даты семинара */}
                        <div className={styles.formField}>
                            <label htmlFor="date">Дата:</label>
                            <Field name="date" type="date" required /> {/* Поле ввода с типом дата */}
                        </div>

                        {/* Поле для выбора времени семинара */}
                        <div className={styles.formField}>
                            <label htmlFor="time">Время:</label>
                            <Field name="time" type="time" required /> {/* Поле ввода с типом время */}
                        </div>

                        {/* Поле для ввода URL фотографии семинара */}
                        <div className={styles.formField}>
                            <label htmlFor="photo">URL фотографии:</label>
                            <Field name="photo" type="url" required /> {/* Поле ввода с типом URL */}
                        </div>

                        {/* Кнопка для сохранения изменений семинара */}
                        <button type="submit" className={styles.saveButton}>Сохранить изменения</button>

                        {/* Кнопка для закрытия модального окна */}
                        <button type="button" className={styles.cancelButton} onClick={onRequestClose}>Закрыть</button>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};
export default EditSeminarModal;
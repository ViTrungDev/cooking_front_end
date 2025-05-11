import ReactDOM from 'react-dom';
import styles from './ToastProtal.module.scss';

function ToastPortal({ show, message }) {
    if (!show) return null;

    return ReactDOM.createPortal(
        <div className={styles.toast}>{message}</div>,
        document.body,
    );
}

export default ToastPortal;

import { Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import styles from "./Spinner.module.scss";

const Spinner = () => {
    return (
        <Content className={styles.spinnerContainer}>
            <Spin size="large"/>
        </Content>
    )
}

export default Spinner

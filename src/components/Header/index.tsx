// Styles
import './Header.scss';

// antd
import { Layout, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// Interface
interface PropsInterface {
	name?: string;
}

function Header({ name }: PropsInterface) {
	return (
		<Layout.Header className="header">
			<Row className="header__row" justify="space-between" align="middle">
				<Col className="logo" xs={8}>
					<img src="./ecozum-logo.png" alt="Eçözüm Logo" />
				</Col>
				{name && (
					<Col className="userInfo" xs={8}>
						<UserOutlined className="userInfo__icon" />
						<span className="userInfo__name">{name}</span>
					</Col>
				)}
			</Row>
		</Layout.Header>
	);
}

export default Header;

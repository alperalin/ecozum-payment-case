// Imports
import { useAppSelector } from '../../hooks/hooks';

// Styles
import './style.scss';

// antd
import { Layout, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function Header() {
	// Redux
	const { fullName } = useAppSelector((state) => state.user);

	return (
		<Layout.Header className="header">
			<Row className="header__row" justify="space-between" align="middle">
				<Col className="logo" xs={8}>
					<img src="./ecozum-logo.png" alt="Eçözüm Logo" />
				</Col>
				{fullName && (
					<Col className="userInfo" xs={8}>
						<UserOutlined className="userInfo__icon" />
						<span className="userInfo__name">{fullName}</span>
					</Col>
				)}
			</Row>
		</Layout.Header>
	);
}

export default Header;

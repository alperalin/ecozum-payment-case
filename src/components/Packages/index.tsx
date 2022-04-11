import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

// Store
import { packagesFetchAll } from '../../features/packages/packagesSlice';

// antd
import { Layout, Row, Col, Typography, List, Button, Spin, Alert } from 'antd';

// Styles
import './style.scss';

// Component
import Header from '../Header';
import Package from '../Package';
import Amount from '../Amount';

// antd variables
const { Content } = Layout;
const { Title } = Typography;

// Element
function Packages() {
	// Router
	const navigate = useNavigate();

	// Redux
	const {
		data: packages,
		apiStatus,
		apiMessage,
	} = useAppSelector((state) => state.packages);
	const dispatch = useAppDispatch();

	// Functions
	// first init
	useEffect(() => {
		dispatch(packagesFetchAll());
	}, []);

	return (
		<Layout className="packages-layout">
			<Header />
			<Content className="packages-content">
				<Row
					className="packages-row"
					justify="center"
					align="middle"
					gutter={30}
				>
					{apiStatus === 'loading' && <Spin size="large" tip="Loading" />}

					{apiMessage && <Alert message={apiMessage} type="error" showIcon />}

					{apiStatus === 'succeeded' && (
						<Col className="packages-column" xs={20}>
							<div className="packages">
								<Title level={1}>Paketler</Title>

								<List
									grid={{
										gutter: 15,
										xs: 1,
										sm: 1,
										md: 2,
										lg: 2,
										xl: 3,
										xxl: 3,
									}}
									dataSource={packages}
									renderItem={(packageItem) => (
										<List.Item key={packageItem.id}>
											<Package packageItem={packageItem} />
										</List.Item>
									)}
								/>

								<div className="packages__footer">
									<Amount />
									<Button type="primary" onClick={() => navigate('/payment')}>
										Devam Et
									</Button>
								</div>
							</div>
						</Col>
					)}
				</Row>
			</Content>
		</Layout>
	);
}

export default Packages;

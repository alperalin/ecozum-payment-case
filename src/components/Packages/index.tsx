import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

// Store
import { packagesFetchAll } from '../../features/packages/packagesSlice';

// antd
import { Layout, Row, Col, Typography, List, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// Styles
import './Packages.scss';

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
	const { data: packages, apiStatus } = useAppSelector(
		(state) => state.packages
	);
	const dispatch = useAppDispatch();

	// Functions
	// first init
	useEffect(() => {
		dispatch(packagesFetchAll());
	}, []);

	return (
		<Layout className="packages">
			<Header />
			<Content className="packages__content">
				<Row className="packages__row" justify="center" align="middle">
					<Col className="packages__column" xs={20}>
						<Title level={1}>Paketler</Title>

						{apiStatus === 'loading' ? (
							<LoadingOutlined />
						) : (
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
						)}

						<div className="packages__footer">
							<Amount />
							<Button type="primary" onClick={() => navigate('/payment')}>
								Devam Et
							</Button>
						</div>
					</Col>
				</Row>
			</Content>
		</Layout>
	);
}

export default Packages;

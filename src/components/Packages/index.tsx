import React from 'react';

// antd
import { Layout, Row, Col, Typography, List, Card, Button } from 'antd';

// Styles
import './Packages.scss';

// Component
import Header from '../Header';
const { Content } = Layout;
const { Title } = Typography;

// Element
function Packages() {
	const data = [
		{
			title: 'Title 1',
		},
		{
			title: 'Title 2',
		},
		{
			title: 'Title 3',
		},
		{
			title: 'Title 4',
		},
		{
			title: 'Title 5',
		},
		{
			title: 'Title 6',
		},
	];

	return (
		<Layout className="packages">
			<Header />
			<Content className="packages__content">
				<Row className="packages__row" justify="center" align="middle">
					<Col className="packages__column" xs={18} md={20}>
						<Title level={1}>Paketler</Title>
						<List
							grid={{
								gutter: 15,
								xs: 1,
								sm: 1,
								md: 2,
								lg: 2,
								xl: 3,
								xxl: 4,
							}}
							dataSource={data}
							renderItem={(item) => (
								<List.Item>
									<Card title={item.title}>Card content</Card>
								</List.Item>
							)}
						/>

						<div className="packages__footer">
							<span>Secilen Paket Tutari: 0₺</span>
							<Button type="primary">Devam Et</Button>
						</div>
					</Col>
				</Row>
			</Content>
		</Layout>
	);
}

export default Packages;

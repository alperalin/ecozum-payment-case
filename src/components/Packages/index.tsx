import React from 'react';

// antd
import { Layout, Row, Col, Typography, List, Button } from 'antd';

// Styles
import './Packages.scss';

// Component
import Header from '../Header';
import Package from '../Package';
const { Content } = Layout;
const { Title } = Typography;

// Element
function Packages() {
	const data = [
		{
			imagePath: 'http://placeimg.com/640/480/business',
			name: 'Paket Adı 1',
			details: ['ipsa', 'excepturi', 'dolorem'],
			tags: ['voluptatem', 'maiores', 'velit'],
			amount: 200,
			currency: '₺',
			id: 1,
		},
		{
			imagePath: 'http://placeimg.com/640/480/business',
			name: 'Paket Adı 2',
			details: ['quo', 'deleniti', 'officiis'],
			tags: ['et', 'quasi', 'voluptas'],
			amount: 220,
			currency: '₺',
			id: 2,
		},
		{
			imagePath: 'http://placeimg.com/640/480/business',
			name: 'Paket Adı 3',
			details: ['earum', 'sed', 'eos'],
			tags: ['nam', 'nihil', 'occaecati'],
			amount: 280,
			currency: '₺',
			id: 3,
		},
		{
			imagePath: 'http://placeimg.com/640/480/business',
			name: 'Paket Adı 4',
			details: ['tempora', 'sint', 'placeat'],
			tags: ['rerum', 'debitis', 'eum'],
			amount: 100,
			currency: '₺',
			id: 4,
		},
		{
			imagePath: 'http://placeimg.com/640/480/business',
			name: 'Paket Adı 5',
			details: ['omnis', 'odio', 'nulla'],
			tags: ['est', 'nihil', 'ut'],
			amount: 199.5,
			currency: '₺',
			id: 5,
		},
		{
			imagePath: 'http://placeimg.com/640/480/business',
			name: 'Paket Adı 5',
			details: ['fugiat', 'aut', 'voluptatem'],
			tags: ['aut', 'et', 'animi'],
			amount: 421,
			currency: '₺',
			id: 6,
		},
	];

	return (
		<Layout className="packages">
			<Header />
			<Content className="packages__content">
				<Row className="packages__row" justify="center" align="middle">
					<Col className="packages__column" xs={20}>
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
							dataSource={data}
							renderItem={({
								id,
								name,
								imagePath,
								details,
								tags,
								amount,
								currency,
							}) => (
								<List.Item>
									<Package
										key={id}
										id={id}
										name={name}
										imagePath={imagePath}
										details={details}
										tags={tags}
										amount={amount}
										currency={currency}
									/>
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

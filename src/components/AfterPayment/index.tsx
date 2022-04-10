// Antd
import { Layout, Row, Col, Result } from 'antd';

// Styles
import './AfterPayment.scss';

// Component
import Header from '../Header';
const { Content } = Layout;

function AfterPayment() {
	return (
		<Layout className="payment">
			<Header />
			<Content className="payment__content">
				<Row className="payment__row" justify="center" align="top" gutter={30}>
					<Col className="payment__column" xs={20} md={12}>
						<Result
							style={{ backgroundColor: '#ffffff' }}
							status="success"
							title="Satın alma işlemi gerçekleşti!"
						/>
					</Col>
				</Row>
			</Content>
		</Layout>
	);
}

export default AfterPayment;

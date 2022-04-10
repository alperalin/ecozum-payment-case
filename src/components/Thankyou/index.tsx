// imports
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { paymentResetState } from '../../features/payment/paymentSlice';
import { packagesResetState } from '../../features/packages/packagesSlice';

// Antd
import { Layout, Row, Col, Result } from 'antd';

// Styles
import './style.scss';

// Component
import Header from '../Header';

// antd variables
const { Content } = Layout;

// Element
function Thankyou() {
	// Redux
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(paymentResetState());
		dispatch(packagesResetState());
	}, []);

	return (
		<Layout className="thankyou">
			<Header />
			<Content className="thankyou__content">
				<Row className="thankyou__row" justify="center" align="middle">
					<Col className="thankyou__column" xs={20} md={12}>
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

export default Thankyou;

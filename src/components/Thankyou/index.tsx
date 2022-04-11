// imports
import { useEffect } from 'react';

// Store
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
		// eslint-disable-next-line
	}, []);

	return (
		<Layout className="thankyou-layout">
			<Header />
			<Content className="thankyou-content">
				<Row
					className="thankyou-row"
					justify="center"
					align="middle"
					gutter={30}
				>
					<Col className="thankyou-column" xs={20} md={8}>
						<Result
							className="thankyou"
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

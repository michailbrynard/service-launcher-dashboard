import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import { BigNumber } from 'bignumber.js' 
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getCampaignData } from '../actions/campaign'
import Loader from '../components/loader'
import { style } from '../style/'

const Earn = ({ data, currency }) => (
	<div className='container'>
		<div className='row'>
		<br/>
			{
				data && data.length > 0 ?
				data.map((item, index) => {
					const x = new BigNumber(item.reward_amount)
					const reward_amount = x.dividedBy(10000000).toString()
					return (
						<div key={index} className='col-12'>
							<Paper style={style.card} zDepth={3}>
								<div style={style.card_left}>
									<img style={style.card_left_img} src='coins1.svg' alt='earn' />
								</div>
								<div style={style.card_right} className='right'>
									<h3>{item.reward_type.toUpperCase()}</h3>
									<h1>{reward_amount} {currency}</h1>
								</div>
							</Paper>
							<br />
						</div>
					)
				}) : 
					<div className='col-12'>
						<Paper style={style.transaction_card} zDepth={3}>
							<div className='container center'>
								<br />
								<h3>No Rewards</h3>
								<br />
							</div>
						</Paper>
						<br />
					</div>
			}
		</div>
	</div>
)

class EarnContainer extends Component {

	componentDidMount() {
		const user_data = JSON.parse(localStorage.getItem('user'))
		this.props.getCampaignData(user_data.company)
	}

	render() {
		const { data, loading } = this.props
		const user_data = JSON.parse(localStorage.getItem('user'))

		return (
			<div>
				{
					loading ?
					<Loader/> :
						<Earn data={data} currency={user_data && user_data.currency && user_data.currency.code} />
				}
			</div>
		)
	}
}



function mapStateToProps(state) {
	const { data, loading } = state.campaign
	return {
		data,
		loading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getCampaignData: bindActionCreators(getCampaignData, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EarnContainer)
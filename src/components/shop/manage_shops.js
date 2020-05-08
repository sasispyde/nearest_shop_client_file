import React from 'react';
// import axios from '../../axios';
import { Link } from 'react-router-dom';

class manageShops extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			response : [
				{
					_id  : '7983248623842383EY89',
					shop_name : 'Shop Name',
					address : "address",
					lat : '98.8388333',
					lng : '77.3993933',
					shop_banner_image : 'www.google.com',
					status : 'A',
					non_veg : 1,
					email : '',
					user_name : '',
					password : '',
					non_veg_array : [ 'meat' , 'fish' , 'beef' , 'rabbit' ],
					products : [],
				}
			]
		}
	}
	

	deleteIncredientHandler( e ,id ){
		let confirm = window.confirm("Do You Want to Delete the Shop");
		if(confirm) {
			alert(id);
		}
	}

	render(){
		return (
			<>
			<div className='container-fluid'>
				<hr />
				<div className='text-right'>
					<Link className="btn btn-outline-primary btn-sm" to={'/shop/add_shop'}>Add Shop</Link>
				</div>
				<hr/>
				<div className="table-responsive">
					<table className="table table-bordered table-hover" style = {{ textAlign : 'center' }}>
						<thead>
							<tr>
								<th>S.No</th>
								<th>Shop Name</th>
								<th>Banner Image</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{
							this.state.response.map((data,index)=>
								<tr key={index}>
									<td>{index+1}</td>
									<td>{data['shop_name']}</td>
									<td>{data['shop_banner_image']}</td>
									{ data['status'] === "A" ? <td style={{ color : 'green' }}>Active</td> : <td style={{ color : 'red' }}>Blocked</td> }
									<td>
										<div className="btn-group" role="group" aria-label="Basic example">
				                        	<Link className = 'btn btn-outline-success btn-sm' to={ {
											  pathname: '/shop/add_shop',
											  search: '?id='+data['_id'],
											} } >Edit</Link>&nbsp;
										  	<button type="button" className="btn btn-outline-info btn-sm">Block</button>&nbsp;
										  	<button type="button" onClick={((e) => this.deleteIncredientHandler(e, data['_id']))} className="btn btn-outline-danger btn-sm">Delete</button>
										</div>
									</td>
								</tr>
							)
							}
						</tbody>
					</table>
					<hr/>
					<div>

					</div>
				</div>
			</div>
			</>
		)
	}
}


export default manageShops;
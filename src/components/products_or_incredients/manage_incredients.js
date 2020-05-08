import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';

class manageIncredients extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			response : [
				{
					_id : "39i493342941204i12",
					name : "Sakthi garam masala",
					sub_category : 'garam masala',
					main_category : 'masala',
					status : 'A',
					description : 'blaa blaa blaa',
					each_product_quantity : [
						{
							each_p_quantity : 50,
							total : 100,
						}
					],
				}
			]
		}
	}

	componentDidMount() {
		axios.get('/product/').then((response)=>{
			this.setState({
				response : response.data.data
			})
		}).catch((err) => {
			console.log(err);
		})
	}

	deleteIncredientHandler(e , id){
		alert(id);
	}

	render() {
		return(
			<>
			<div className='container-fluid'>
				<hr />
				<div className='text-right'>
					<Link className="btn btn-outline-primary btn-sm" to={'/incredient/add_product'}>Add Incredient</Link>
				</div>
				<hr/>
				<div className="table-responsive">
					<table className="table table-bordered table-hover" style = {{ textAlign : 'center' }}>
						<thead>
							<tr>
								<th>S.No</th>
								<th>Incrediets Name</th>
								<th>Category</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{
							this.state.response.map((data,index)=>
								<tr key={index}>
									<td>{index+1}</td>
									<td>{data['name']}</td>
									<td>{data['sub_category']}</td>
									{ data['status'] === "A" ? <td style={{ color : 'green' }}>Active</td> : <td style={{ color : 'red' }}>Blocked</td> }
									<td>
										<div className="btn-group" role="group" aria-label="Basic example">
				                        	<Link className="btn btn-outline-success btn-sm" to={`/incredient/edit/${data['_id']}`}>Edit</Link>&nbsp;
										  	<button type="button" className="btn btn-outline-info btn-sm">Block</button>&nbsp;
										  	<button type="button" onClick={((e) => this.deleteIncredientHandler(e, data['_id']))} className="btn btn-outline-danger btn-sm">Delete</button>
										</div>
									</td>
								</tr>
							)
							}
						</tbody>
					</table>
				</div>
			</div>
			</>
		)
	}
}

export default manageIncredients;
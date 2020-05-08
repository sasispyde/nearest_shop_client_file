import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';

class ManageCountry extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			res : [],
		}
	}

	componentDidMount(){
		axios.get('/country/all_country_name').then((result)=>{
			if(result.data.status !== 0){
				this.setState({
					res : result.data.data
				})
			}
		}).catch((err)=>{
			console.log(err)
		})
	}

	deleteCategoryHandler(e,index){
		let data = {
			delete_id  : index
		}
		axios.post('/country/delete',data,{ headers: {'Accept': 'application/json'} }).then((result)=>{
			if(result.data.status === 1){
				this.setState({
					res : result.data.data
				})
			}
		}).catch((err)=>{
			console.log(err);
		})
	}

	render(){
		return(
			<>
			<div className="container-fluid">
				<hr />
				<Link className="btn btn-outline-primary btn-sm" to={`/country/add_country`}>Add Country</Link>
				<hr/>
				<div className="table-responsive">
					<table className="table table-bordered table-hover" style = {{ textAlign : 'center' }}>
					  <thead>
					    <tr>
					      <th scope="col">S.No</th>
					      <th scope="col">Country Name</th>
					      <th scope="col">Banner</th>
					      <th scope="col">Status</th>
					      <th scope="col">Action</th>
					    </tr>
					  </thead>
					  <tbody>
					  { 
					    this.state.res.map((data,i) => 	
		                    <tr key={i}>
		                    	<td>{i+1}</td>
		                        <td>{data['country_name']}</td>
		                        <td><img style={{ width : '100px',heigth : '100px' }} src={data['image']} alt='Country' /></td>
		                        { data['status'] === "A" ? <td style={{ color : 'green' }}>Active</td> : <td style={{ color : 'red' }}>Blocked</td> }
		                        <td>
		                        <div className="btn-group" role="group" aria-label="Basic example">
		                        	<Link className = 'btn btn-outline-success btn-sm' to={ {
									  pathname: '/country/edit',
									  search: '?id='+data['_id'],
									} } >Edit</Link>&nbsp;
								  	<button type="button" className="btn btn-outline-info btn-sm">Block</button>&nbsp;
								  	<button type="button" onClick={((e) => this.deleteCategoryHandler(e, data['_id']))} className="btn btn-outline-danger btn-sm">Delete</button>
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

export default ManageCountry;
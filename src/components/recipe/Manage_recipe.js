import React from 'react';
import { Link } from 'react-router-dom';

class manageRecipe extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			data : [{
				_id : '212871289472384733',
				recipe_name : "chicken Briyani",
				description : "Lorem Ipsam Lorem Ipsam Lorem Ipsam Lorem Ipsam Lorem Ipsam Lorem Ipsam Lorem Ipsam",
				category : "Briyani",
				country : 'India',
				incredients : [
					"rice",
					'chicken',
					'masala',
					'onion',
					'garlic',
					'etc',
				],
				status : "A",
				cooking_time : "30 mins",
				type : "Non_veg",
				n_type : 'chicken',
				tips : ["Lorem Lorem Lorem"],
				timing : "Lunch",
				image_name : "image.png",
				image_path : "/uploads/image.png",
				video_links : 'www.google.com'
			}]
		}
	}
	render(){
		return(
			<>
			<div className = "container-fluid">
				<hr />
				<Link className="btn btn-outline-primary btn-sm" to={'/recipe/add_recipe'}>Add Recipe</Link>
				<hr/>
				<div className="table-responsive">
					<table className="table table-bordered table-hover" style = {{ textAlign : 'center' }}>
						<thead>
							<tr>
								<th>S No</th>
								<th>Recipe Name</th>
								<th>Cousine</th>
								<th>Type</th>
								<th>Category</th>
								<th>Recipe Image</th>
								<th>Incredients</th>
								<th>Cooking Time</th>
								<th>status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.data.map((item , i) =>
									<tr key={i}>
										<td>{i+1}</td>
										<td>{item['recipe_name']}</td>
			                    		<td>{item['country']}</td>
			                    		<td>{item['type']}</td>
			                    		<td>{item['category']}</td>
			                    		<td><img style={{ width : '100px',heigth : '100px' }} src={item['image_path']} alt='Country' /></td>
			                    		<td>{item['incredients'].join(', ').substring(0.10)+"..."}</td>
			                    		<td>{item['cooking_time']}</td>
			                    		{ item['status'] === "A" ? <td style={{ color : 'green' }}>Active</td> : <td style={{ color : 'red' }}>Blocked</td> }
			                    		<td>
			                    		<div className="btn-group" role="group" aria-label="Basic example">
				                        	<Link className="btn btn-outline-success btn-sm" to={`/recipe/edit/${item['_id']}`}>Edit</Link>&nbsp;
										  	<button type="button" className="btn btn-outline-info btn-sm">Block</button>&nbsp;
										  	<button type="button" onClick={((e) => this.deleteCategoryHandler(e, item['_id']))} className="btn btn-outline-danger btn-sm">Delete</button>
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

export default manageRecipe;

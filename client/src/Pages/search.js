import React from 'react';
import { FormCheckbox } from 'shards-react'
import API from '../utilities/API';
import axios from 'axios';

function Search(props) {

	console.log(props);

	return (
		<>
			<div className="container">
				<h3 className="text-center my-3">Search by Ingredients</h3>

				<div className="text-center search-recipe-name-div mt-3">
					<form onSubmit={props.getRecipe} style={{ marginBottom: '2rem' }}>
						<input type="text" name="recipeName" />

						<button>Search</button>
					</form>
				</div>
				<div className="container">
					<div className="row">
						{props.recipes.map((recipe) => {
							axios
								.get(
									`https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=false&apiKey=${process
										.env.REACT_APP_SPOONACULAR_KEY
									}`
								)
								.then((results) => {


									console.log("source url: " + results.data.sourceUrl);
								})
									console.log(recipe.id);
									
									return (
										<div key={recipe.id} className="col-md-4">
											
											<div className="recipe__box">
												
												<div>
													{/* <a href={results.data.sourceUrl}> */}
														<img 
														className="recipe__box-img"
														src={'https://spoonacular.com/recipeImages/' + recipe.imageUrls}
														alt="recipies"
													/>
													{/* </a> */}
													<div className="recipe__text">
														{' '}
														<h5>{recipe.title}</h5>
													</div>
													<button>Favorite</button>
												</div>
											</div>
										</div>
									);
						})}
					</div>
				</div>
			</div>
		</>
	);
}

export default Search;
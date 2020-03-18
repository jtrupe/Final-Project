import React, { useState, useEffect } from 'react';
import { Form, FormInput, FormGroup, Button } from 'shards-react';

import './style.css';
import API from '../utilities/API';
import axios from 'axios';
// console.log(process.env.REACT_APP_SPOONACULAR_KEY);
function Pantry(props) {
	console.log(props)
	const [ userData, setUserData ] = useState({ id: props.userId, pantry: [], favorites: [] });
	const [ queryString, setQueryString ] = useState('');
	const [ searchResults, setSearchResults ] = useState([]);
	const [isUpdating, setIsUpdating] = useState(false);

	useEffect(
		() => {
			API.getUser(userData.id).then((currentUser) => {
				let ingredientsIds = currentUser.data.ingredients;
				let mappedPantry = ingredientsIds.map((i) => i.ingredient);
				let mappedFavorites = currentUser.data.favorites.map((i) => i);
				console.log(mappedPantry);
				setUserData((currentState) => ({ ...currentState, pantry: mappedPantry, favorites: mappedFavorites }));
				setIsUpdating((false));
			});
		},
		{isUpdating}
	);
	console.log(userData);

	// autocomplete search
	useEffect(
		() => {
			console.log(queryString);
			axios
				.get(
					`https://api.spoonacular.com/food/ingredients/autocomplete?query=${queryString}&number=5&apiKey=${process
						.env.REACT_APP_SPOONACULAR_KEY}`
				)
				.then((results) => {
					setSearchResults((currentState) => results.data);
				});
		},
		[ queryString ]
	);
	console.log(searchResults);

	//furhter dev: combine handle add/remove 
	const handleAddItem = (item) => {
		API.findOrCreateIngredient(userData.id, item).then((results) => {
			console.log(results);
			});
			setIsUpdating(true)
	};

	const handleRemoveItem = (item) =>{
		API.deletePantryItem(userData.id, item).then(results=>{
			console.log(results);
		})
	}

	return (
		<div className="container">
			<div className="title text-center mb-0 py-3">
				<h1 className="display-4 text-center m-2">Pantry</h1>
			</div>

			<div className="row">
				<div className="col-sm-6 pt-3 add">
					<h2 className="text-center">
						<u>Add Ingredients</u>
					</h2>
					<input
						type="text"
						id="ingredient-search"
						className="form-control"
						placeholder="start typing to find your ingredient"
						onKeyUp={(e) => setQueryString(e.target.value)}
					/>
					<div className="returned-search-items mt-4" />
					{searchResults.map((i) => {
						return (
							<div key={i.id} className="pantry-item ml-3 font-weight">
								<strong>Item: {i.name}</strong>
								<button
									onClick={() => {
										handleAddItem(i.name);
										
									}}
									value={i.name}
									className="pantry-item-remove text-center btn btn-outline-dark pl-2 pr-1 float-right"
								>
									<span role="img" aria-label="+">
										+
									</span>
								</button>
								<hr />
							</div>
						);
					})}
				</div>

				<div className="myIngredients col-sm-6 pt-3">
					<h2 className="text-center mb-4">
						<u>My Ingredients</u>
					</h2>
					<div className="ingredient-list" />
					{userData.pantry.map((i) => {
						return (
							<div className="pantry-item ml-3 font-weight">
								<strong>Item Name: {i}</strong>
								<button
								onClick = {()=>{
									handleRemoveItem(i)
								}}
									value="{ }"
									className="pantry-item-remove text-center btn btn-outline-dark pl-2 pr-1 float-right"
								>
									<span role="img" aria-label="x">
										❌
									</span>
								</button>
								<hr />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Pantry;

import React from "react";


function Search() {
    
    

        return (
            <div className="container">

                <h3 class="text-center my-3">Search by Recipe Name</h3>

                <div class="search-recipe-name-div mt-3">
                    <div class="input-group mb-3 ">
                        <input type="text" class="form-control border border-dark" id="recipe-name" placeholder="Recipe Name" aria-describedby="button-addon2" />
                        <div class="input-group-append">
                            <button class="btn btn-outline-dark" type="submit" id="search-recipe-name">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


export default Search; 
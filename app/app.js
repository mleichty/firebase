let currentView = "home";

function processRecipes(recipes) {
    // console.log(recipes);
    // var recipe = "";
    $('.recipe').html("");
    // console.log('Show');

    $.each(recipes, function (idx, value) {

        $('.recipe').append(
            //could add template literal with backticks
            //// `<div><p>Recipe Name: ${value.name}</p></div>`
            // '<div>Recipe: ' + value.name +
            // '</div><div> Image: ' + value.image +
            // '</div><div> Description: ' + value.description +
            // '</div><input type="text" value="' + value.name + '" id="recipeName'+ idx +'"/><button class="recipeEdit" id="' + idx + '">Edit Recipe</button>'
            `<div class="recipe__one">
            <div class="recipe__top" id="${idx}">
                <div class="recipe__image" style="background-image: url('images/${value.image}')">
                </div>
                <div class="recipe__info">
                    <div class="recipe__title">
                        <p><span class="recipe__underline">${value.name}</span></p>
                    </div>
                    <div class="recipe__desc">
                        <p>${value.description}</p>
                    </div>
                    <div class="recipe__ts">
                        <div class="recipe__SVG">
                            <img src="images/time.svg" alt="">
                        </div>
                        <div class="recipe__P">
                            <p>${value.time.hour}h ${value.time.min}min</p>
                        </div>
                    </div>
                    <div class="recipe__ts">
                        <div class="recipe__SVG">
                            <img src="images/servings.svg" alt="">
                        </div>
                        <div class="recipe__P">
                            <p>${value.servingSize} servings</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="recipe__bottom">
                <p class="button button--yellow edit_recipe" id="${idx}">Edit Recipe</p>
                <p class="button button--yellow delete_recipe" id="${idx}">Delete Recipe</p>
            </div>
        </div>`
        );

        //this broke the entire website so did inline styling above
        // $('.recipe__image').css('background-image', 'url(../images/' + value.image + ')');

        // $(".recipeEdit").click(function (e) {
        //     var recipeKey = e.currentTarget.id;
        //     console.log($("#recipeName" + recipeKey).val());
        //
        //     var newEdit = {
        //         name: $("#recipeName" + recipeKey).val()
        //     };
        //
        //     FIREBASE_UTILITY.updateRecipe(recipeKey, newEdit);
        //     // console.log($("#recipeDescription").val());
        //     // console.log(recipeKey);
        //     //   need to call the edit button
        //     //     FIREBASE_UTILITY.updateRecipe(recipeKey);
        // });
    });

    //how do I get the recipe info that was clicked on?
    //I can get the id but do I need to connect to the database to get the other info?
    //I technically have all that recipe info during the each loop,
    //so how would I pass that to here?
    $(".recipe__top").click(function (e) {
        var recipeKey = e.currentTarget.id;
        console.log(recipeKey);
        //JK, I can get recipe info from the recipes array we already have
        // FIREBASE_UTILITY.getRecipe(recipeKey);
        // console.log(recipeDetail);

        $('.detail').html("");

        $('.' + currentView).css('display', 'none');
        $('.detail').css('display', 'flex');
        currentView = "detail";

        $('.detail').append(
            `<div class="detail__half">
                <div class="detail__left">
                    <div class="detail__image" style="background-image: url('images/${recipes[recipeKey].image}')">
                    </div>
                    <p class="detail__boldP detail__boldP--rotate">${recipes[recipeKey].name}</p>
                </div>
                <div class="detail__right">
                    <p class="detail__boldP">Description:</p>
                    <p>${recipes[recipeKey].description}</p>
                    <p class="detail__boldP">Total Time:</p>
                    <p>${recipes[recipeKey].time.hour}h ${recipes[recipeKey].time.min}min</p>
                    <p class="detail__boldP">Servings:</p>
                    <p>${recipes[recipeKey].servingSize} servings</p>
                </div>
            </div>
            <div class="detail__bottom">
                <div class="detail__ing">
                    <p class="detail__boldP">Ingredients:</p>
                    <!--TBH, not quite sure how this works-->
                    ${recipes[recipeKey].ingredients.map((value) => `<p>${value}</p>`).join('')}
                </div>
                <div class="detail__inst">
                    <p class="detail__boldP">Instructions:</p>
                    ${recipes[recipeKey].instructions.map((value) => `<p>${value}</p>`).join('')}
                </div>
                <p class="button button--yellow edit_recipe" id="${recipeKey}">Edit Recipe</p>
                <p class="button button--yellow delete_recipe" id="${recipeKey}">Delete Recipe</p>
            </div>`
        );

        init_editView(recipes);
        init_deleteFB();
    });

    init_editView(recipes);
    init_deleteFB();
}

function init_editView(recipes) {
    $('.edit_recipe').click(function (e) {
        //edit_recipe is not listening??
        //ATTEMPT 1: rename class since id with same name
        //ATTEMPT 2: take off other classes
        //ATTEMPT 3: add on, click instead of just click
        //ATTEMPT 4: add initEdit function in .recipe__one click function
        //then call this click function
        //ATTEMPT 5: comment out variables under append
        //ATTEMPT 6: add to init() instead of the processRecipes
        //even though wouldn't have access to recipes
        //ATTEMPT 7: tried targeting another class within detail append
        //ATTEMPT 8: change id since technically the same as detail append
        //but nothing is working, recipe append is but not detail, WHY?
        console.log('Edit');
        var recipeKey = e.currentTarget.id;
        console.log(recipeKey);

        $('.form__edit').html("");

        $('.' + currentView).css('display', 'none');
        $('.edit').css('display', 'flex');
        currentView = "edit";

        $('.form__edit').append(
            `<input value="${recipes[recipeKey].image}" type="text" name="image" id="edit_image">
        <input value="${recipes[recipeKey].name}" type="text" name="name" id="edit_name">
        <input value="${recipes[recipeKey].description}" type="text" name="description" id="edit_desc">
        <input value="${recipes[recipeKey].time.hour}" type="number" name="hour" id="edit_hour">
        <input value="${recipes[recipeKey].time.min}" type="number" name="minutes" id="edit_minutes">
        <input value="${recipes[recipeKey].servingSize}" type="number" name="servings" id="edit_servings">
        <div class="ingWrapper">
            <p>Enter Ingredients: </p>
            <div class="ingInput">
                <!--<div><input type="text" name="ing[]"></div>-->
                ${recipes[recipeKey].ingredients.map((value) => `<input value="${value} " type="text" name="ing[]">`).join('')}
            </div>
            <div class="button button--red button--add button--adding"><i class="fas fa-plus"></i></div>
        </div>
        <div class="instWrapper">
            <p>Enter Instructions: </p>
            <div class="instInput">
                <!--<input type="text" name="inst[]">-->
                ${recipes[recipeKey].instructions.map((value) => `<input value="${value}" type="text" name="inst[]">`).join('')}
            </div>
            <div class="button button--red button--add button--addinst"><i class="fas fa-plus"></i></div>
        </div>
        <input type="submit" value="Submit Changes" class="button button--red" id="edit_recipe">`
        );

        init_editFB(recipeKey);
        init_addIngAndInst(recipes[recipeKey].ingredients, recipes[recipeKey].instructions);
    });
}

function init_deleteFB() {
    $('.delete_recipe').click(function (e) {
        e.preventDefault();
        console.log('Delete');
        var recipeKey = e.currentTarget.id;
        console.log(recipeKey);

        FIREBASE_UTILITY.deleteRecipe(recipeKey);
    });
};

function init_editFB(recipeKey) {
    $('#edit_recipe').click(function (e) {
        e.preventDefault();
        console.log('Edit');

        var recipeArray = $('.form__edit input').serializeArray();
        console.log(recipeArray);

        var ingArray = $('.form__edit .ingInput input').serializeArray();
        console.log(ingArray);

        var instArray = $('.form__edit .instInput input').serializeArray();
        console.log(instArray);

        FIREBASE_UTILITY.updateRecipe(recipeKey, recipeArray, ingArray, instArray);
    });
}

function init_addIngAndInst(ing, inst) {
    //add and delete ingredient divs
    //set x to the ingredient array length sent from the specific recipe so will add onto that number
    let x = ing.length;
    $('.button--adding').click(function (e) {
        e.preventDefault();
        x++;
        $('.ingInput').append('<div class="ingNextInput"><input type="text" name="ing[]" placeholder="Ingredient #' + x + '"/><div class="button button--red button--add button--delete"><i class="fas fa-minus"></i></div></div>');
    });

    $('.ingInput').on("click", ".button--delete", function (e) {
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    });

    //add and delete instruction divs
    let y = inst.length;
    $('.button--addinst').click(function (e) {
        e.preventDefault();
        y++;
        $('.instInput').append('<div class="instNextInput"><input type="text" name="inst[]" placeholder="Instruction #' + y + '"/><div class="button button--red button--add button--delete"><i class="fas fa-minus"></i></div></div>');
    });

    $('.instInput').on("click", ".button--delete", function (e) {
        e.preventDefault();
        $(this).parent('div').remove();
        y--;
    });
}

function init() {
    //Add click connect to firebase
    $('#add_recipe').click(function (e) {
        e.preventDefault();
        console.log('Add');
        // var newName = $('#addRecipeName').val();
        //ATTEMPT 1: serialize()
        //this only returns a URL-type string and can't access values
        // var recipeArray = $('.form__add input').serialize();
        //ATTEMPT 2: makeArray()
        //this doesn't have values, just the input#id
        // var recipeInfo = $('.form__add input');
        // console.log(recipeInfo);
        // var recipeArray = $.makeArray(recipeInfo);
        //ATTEMPT 3: serializeArray()
        var recipeArray = $('.form__add input').serializeArray();
        console.log(recipeArray);
        //ATTEMPT 3.1: put serializeArray() into object format so can loop through ings and insts
        //this only got last value of the ing or inst array
        // var inputs = {};
        // $.each(recipeArray, function(k, v){
        //     inputs[v.name]= v.value;
        // });
        //ATTEMPT 3.2: put ingInputs into different array?
        //ATTEMPT 3.3: loop through ingArray in model? WORKED! WTF
        var ingArray = $('.form__add .ingInput1 input').serializeArray();
        console.log(ingArray);
        // var ingInputs = {};
        // $.each(ingArray, function(k, v){
        //     ingInputs[v.name]= v.value;
        // });
        // console.log(ingInputs);
        var instArray = $('.form__add .instInput1 input').serializeArray();
        console.log(instArray);
        FIREBASE_UTILITY.writeRecipe(recipeArray, ingArray, instArray);
    });

    //add and delete ingredient divs
    //added .button--adding1, .ingInput1 and .instInput1 so clicking on edit page doesn't change
    //divs on create recipe page
    let a = 1;
    $('.button--adding1').click(function (e) {
        e.preventDefault();
        a++;
        $('.ingInput1').append('<div class="ingNextInput"><input type="text" name="ing[]" placeholder="Ingredient #' + a + '"/><div class="button button--red button--add button--delete"><i class="fas fa-minus"></i></div></div>');
    });

    $('.ingInput1').on("click", ".button--delete", function (e) {
        e.preventDefault();
        $(this).parent('div').remove();
        a--;
    });

    //add and delete instruction divs
    let b = 1;
    $('.button--addinst1').click(function (e) {
        e.preventDefault();
        b++;
        $('.instInput1').append('<div class="instNextInput"><input type="text" name="inst[]" placeholder="Instruction #' + b + '"/><div class="button button--red button--add button--delete"><i class="fas fa-minus"></i></div></div>');
    });

    $('.instInput1').on("click", ".button--delete", function (e) {
        e.preventDefault();
        $(this).parent('div').remove();
        b--;
    });

    //this isn't doing anything
    // $('.delete').click(function (e) {
    //     console.log('Delete');
    //
    //     FIREBASE_UTILITY.deleteRecipe();
    // });

    //Browse click connect to firebase
    $('#browse').click(function (e) {
        // console.log('Show');

        FIREBASE_UTILITY.getAllRecipes(processRecipes);
    });

    //nav bar mobile dropdown
    var clicked = false;

    $('.nav__ham').click(function () {
        $('.nav__links').toggleClass('open');
        $('.nav__button').removeClass('button').removeClass('button--yellow');
        clicked = !clicked;
    });

    $(window).resize(function () {
        if (window.innerWidth >= 768) {
            $('.nav__button').addClass('button').addClass('button--yellow');
        }
        if (window.innerWidth >= 768 && $(".nav__links").hasClass("open")) {
            $(".nav__links").removeClass("open");
        } else if (window.innerWidth < 768 && clicked) {
            $(".nav__links").addClass("open");
            $('.nav__button').removeClass('button').removeClass('button--yellow');
        }
    });

    //nav bar link functionality
    $(".nav a").click(function (e) {
        let pageName = e.currentTarget.id;

        // console.log(pageName);

        if (pageName !== currentView) {
            $("." + currentView).css('display', 'none');
            $("." + pageName).css('display', 'flex');
            currentView = pageName;
        }
    });
}

$(document).ready(function () {
    $("." + currentView).css('display', 'flex');
    init();
});
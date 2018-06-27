import $ from 'jquery';

class Search {

    constructor(){
        this.addSearchHTML();
        this.resultsDiv = $("#search-overlay__results");
        this.openButton = $(".js-search-trigger");
        this.closeButton = $(".search-overlay__close");
        this.searchOverlay = $(".search-overlay");
        this.searchField = $("#search-term");
        this.isOverlayOpen = false;
        this.isSpinnerVisible = false;
        this.typingTimer = null;
        this.previousValue = null;
        this.events();
    }

    events(){
        this.openButton.on("click", this.openOverlay.bind(this));
        this.closeButton.on("click", this.closeOverlay.bind(this));
        $(document).on("keyup", this.keyPressDispatcher.bind(this));
        this.searchField.on("keyup", this.typingLogic.bind(this));
    }

    typingLogic() {
        if(this.searchField.val() !== this.previousValue) {
            clearTimeout(this.typingTimer);

            if(this.searchField.val()){
                if(!this.isSpinnerVisible){
                    this.resultsDiv.html('<div class="spinner-loader"></div>');
                    this.isSpinnerVisible = true;
                }
                this.typingTimer = setTimeout(this.getResults.bind(this), 750);
            } else {
                this.resultsDiv.html('');
                this.isSpinnerVisible = false;
            }
        }
        this.previousValue = this.searchField.val();

    }

    getResults(){
        $.getJSON(universityData.root_url + '/wp-json/university/v1/search?keyword=' + this.searchField.val(), (searchResults) => {
            this.resultsDiv.html(`
            <div class="row">
                
                <div class="one-third">
                    <h2 class="search-overlay__section-title">General Information</h2>
                    ${searchResults.generalInfo.length ? '<ul class="link-list min-list">' : '<p>No general information matches that search</p>'}
                    ${searchResults.generalInfo.map(foundItem => `<li><a href="${foundItem.permalink}">${foundItem.title}</a>
                    ${foundItem.postType === 'post' ? `by ${foundItem.authorName}` : ''}</li>`).join('')}
                    ${searchResults.generalInfo.length ? '</ul>' : ''}
                </div>
                
                <div class="one-third">
                    <h2 class="search-overlay__section-title">Programs</h2>
                    ${searchResults.programs.length ? '<ul class="link-list min-list">' : `<p>No programs match that search. <a href="${universityData.root_url}/programs">View all programs</a></p>`}
                    ${searchResults.programs.map(foundItem => `<li><a href="${foundItem.permalink}">${foundItem.title}</a></li>`).join('')}
                    ${searchResults.programs.length ? '</ul>' : ''}
                    
                    <h2 class="search-overlay__section-title">Professors</h2>
                    ${searchResults.professors.length ? '<ul class="professor-cards">' : `<p>No professors match that search.</p>`}
                    ${searchResults.professors.map(foundItem => `
                    <li class="professor-card__list-item">
                       <a class="professor-card" href="${foundItem.permalink}">
                            <img class="professor-card__image" src="${foundItem.image}">
                            <span class="professor-card__name">${foundItem.title}</span>
                       </a>
                    </li>
                    `).join('')}
                    ${searchResults.professors.length ? '</ul>' : ''}

            </div>
                <div class="one-third">
                    <h2 class="search-overlay__section-title">Campuses</h2>
                    ${searchResults.campuses.length ? '<ul class="link-list min-list">' : `<p>No campuses match that search. <a href="${universityData.root_url}/campuses">View all campuses</a></p>`}
                    ${searchResults.campuses.map(foundItem => `<li><a href="${foundItem.permalink}">${foundItem.title}</a></li>`).join('')}
                    ${searchResults.campuses.length ? '</ul>' : ''}
                
                    <h2 class="search-overlay__section-title">Events</h2>
                    ${searchResults.events.length ? '' : `<p>No events match that search. <a href="${universityData.root_url}/events">View all events</a></p>`}
                    ${searchResults.events.map(foundItem => `
                    <div class="event-summary">
	                    <a class="event-summary__date t-center" href="${foundItem.permalink}">
                            <span class="event-summary__month">${foundItem.month}</span>
		                    <span class="event-summary__day">${foundItem.day}</span>
	                    </a>
	                    <div class="event-summary__content">
		                     <h5 class="event-summary__title headline headline--tiny"><a href="${foundItem.permalink}">${foundItem.title}</a></h5>
		                     <p>${foundItem.description} <a href="${foundItem.permalink}" class="nu gray">Learn more</a></p>
	                       </div>
                    </div>
                    `).join('')}
            </div>
            `);
            this.isSpinnerVisible = false;
        });
    }

    keyPressDispatcher(e){


        if(e.keyCode === 83 && !this.isOverlayOpen && !$("input, textarea").is(':focus')){
            this.openOverlay();
        }

        if(e.keyCode === 27 && this.isOverlayOpen){
            this.closeOverlay();
        }
    }

    openOverlay(){
        this.searchOverlay.addClass("search-overlay--active");
        $("body").addClass("body-no-scroll");
        this.searchField.val('');
        setTimeout(() => this.searchField.focus(), 400);
        this.isOverlayOpen = true;

        return false;
    }
    closeOverlay(){
        this.searchOverlay.removeClass("search-overlay--active");
        $("body").removeClass("body-no-scroll");
        this.isOverlayOpen = false;
    }

    addSearchHTML(){
        $("body").append(`
        <div class="search-overlay">
           <div class="search-overlay__top">
              <div class="container">
                <i class=" fa fa-search search-overlay__icon" aria-hidden="true"></i>
                <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term">
                <i class=" fa fa-window-close search-overlay__close" aria-hidden="true"></i>
            </div>
        </div>

        <div class="container">
            <div id="search-overlay__results">
            </div>
        </div>
        
    </div>
        `);
    }
}

export default Search;
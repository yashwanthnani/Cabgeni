
var SearchBox = {
    /* 
     * init
     * Initialize the object
     */
    init: function() {
        console.log('SearchBox.init()');

        /* Initialize DOM objects */
        this.nominatimSearch = document.querySelector('#nominatimSearch');
        this.contactSearch = document.querySelector('#contactSearch');
        this.googleSearch = document.querySelector('#googleSearch');
        this.hybridSearch = document.querySelector('#hybridSearch');

        this.contactSearchInput = this.contactSearch.querySelector('#contactSearch input');
        this.contactSearchButton = this.contactSearch.querySelector('#contactSearch button#contactSearchBtn');
        this.contactDatalist = this.contactSearch.querySelector('#contacts');

        this.contactShowAllButton = this.contactSearch.querySelector('button#contactShowAllBtn');

        var self = this;

        /* Initialize event handlers */
        this.contactSearchInput.value = '';
        this.contactSearchButton.onclick = function() {
            self.searchContact(self.contactSearchInput.value);
            return false;
        };
        this.contactShowAllButton.onclick = function() {
            self.showAllContacts();
            return false;
        };

        /* Init contact search if address book is not empty */
        ContactManager.getAllContacts(function(contact) {
            console.log("Retrieving contact from the address book");
            self.contactDatalist.innerHTML = self.contactDatalist.innerHTML + '<option>' + contact.name + '</option>';
        }, function() {
            console.log("Error in retrieving contacts from the address book");
            self.hideContactSearch();
        });
    },
    /*
     * search
     * Submit the query to the search engine of the map displayed and show the search results on the map
     * @param {String} query
     */
    search: function(query) {
        console.log('SearchBox.search(query)');
        console.log(query);
 
        var contactName = this.contactSearchInput.value;

        if (contactName !== '' && ContactManager.isContact(query) === false) {
            ContactManager.findContact({
                filterBy: ['name'],
                filterValue: contactName,
                filterOp: 'equals'
            }, function(contactsFound) { // success callback
                if (contactsFound.length > 0) {
                    var contact = contactsFound[0];

                    if (contact.adr && contact.adr.length > 0) {
                        console.log(contactName + ' has already an address');
                    }
                    else {
                        // update the contact
                        ContactManager.addAddressToContact(query, contact, function() {
                            alert("The address was inserted correctly");
                        }, function() {
//                            alert("Error in inserting address");
                        });
                    }
                }
                else {
                    alert(contactName + ' not found in address book');
                }
            }, function() { // error callback
                console.log("contact not found");
            });
        }

        /* Perform the search if a query is specified */
        if (query) {
            GeoMap.search(query);
        }
        else {
            alert("Please insert a address");
        }
    },
    /*
     * searchContact
     * Submit the query to the address book and show the search results on the map
     * @param {String} query
     */
    searchContact: function(query) {
        console.log('SearchBox.searchContact(query)');
        console.log(query);

        var self = this;

        /* Perform the search if a query is specified */
        if (query) {
            ContactManager.findContact({
                filterBy: ['name'],
                filterValue: query,
                filterOp: 'contains'
            }, function(contactsFound) { // success callback
                if (contactsFound.length > 0) {
                    var contact = contactsFound[0];

                    self.contactSearchInput.value = contact.name[0];

                    if (contact.adr && contact.adr.length > 0) {
                        self.search(contact);
                    }
                    else {
                        alert('No address specified for ' + contact.name[0] + ". Insert a address and click Search to add it to the contact");
                    }
                }
                else {
                    alert(query + ' not found in address book');
                }
            }, function() { // error callback

            });
        }
        else {
            alert("Please insert a value");
        }
    },
    /*
     * showAllContacts
     * Show all contacts on the map
     */
    showAllContacts: function() {
        console.log('SearchBox.showAllContacts()');

        var self = this;

        ContactManager.getAllContacts(function(contact) {
            if (contact.adr) {
                self.search(contact);
            }
        });
    },
    /*
     * showNominatimSearch
     * Show the nominatim search UI
     */
    showNominatimSearch: function() {
        console.log('SearchBox.showNominatimSearch()');
        this.googleSearch.style.display = 'none';
        this.hybridSearch.style.display = 'none';
        this.nominatimSearch.style.display = 'block';
    },
    /*
     * showContactSearch
     * Show the contact search UI
     */
    showContactSearch: function() {
        console.log('SearchBox.showContactSearch()');
        this.contactSearch.style.display = 'block';
    },
    /*
     * hideContactSearch
     * Hide the contact search UI
     */
    hideContactSearch: function() {
        console.log('SearchBox.showContactSearch()');
        this.contactSearch.style.display = 'none';
    },
    /*
     * showGoogleSearch
     * Show the Google search UI
     */
    showGoogleSearch: function() {
        console.log('SearchBox.showGoogleSearch()');
        this.nominatimSearch.style.display = 'none';
        this.contactSearch.style.display = 'none';
        this.hybridSearch.style.display = 'none';
        this.googleSearch.style.display = 'block';
    },
    /*
     * showHybridSearch
     * Show the Google search UI
     */
    showHybridSearch: function() {
        console.log('SearchBox.showHybridSearch()');
        this.nominatimSearch.style.display = 'none';
        this.contactSearch.style.display = 'none';
        this.googleSearch.style.display = 'none';
        this.hybridSearch.style.display = 'block';
    }
};

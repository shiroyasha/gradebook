
var podaci = [ { id: 1 , name : "Baze podataka I"	},
               { id: 2,name : "Baze podataka II"}	,
               { id: 3,name : "Informacioni sistemi I (I)"},	
               { id: 4,name : "Informacioni sistemi I (M1/M2/GI)"},	
               { id: 5,name : "Informacioni sistemi II"},
               { id: 6,name : "Konstrukcija kompajlera"},
               { id: 7,name : "Metodika informatike"},
               { id: 8,name : "Objektno-orijentisano programiranje 1"},
               { id: 9,name : "Objektno-orijentisano programiranje 2"},
               { id: 10,name : "Obrazovni softver i elektronsko učenje"},
               { id: 11,name : "Operativni sistemi I"},
               { id: 12,name : "Operativni sistemi II"},	
               { id: 13,name : "Poslovna informatika"},
               { id: 14,name : "Programski jezici"},
               { id: 15,name : "Računarska grafika 1"},
               { id: 16,name : "Računarske mreže"},
               { id: 17,name : "Softverski praktikum - Stono izdavaštvo"},	
               { id: 18,name : "Softverski praktikum - Vizuelno programiranje"},	
               { id: 19,name : "Software Engineering"},
               { id: 20,name : "Strukture podataka i algoritmi 2"} ];

exports.predmeti = function( user ) {
    return podaci;
};


exports.getGradebookInfo = function( id ) {
    return podaci[id - 1];
};


exports.checkValue = function( id, period, structurePath, value ) {

    var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > 1000){
            break;
        }
    }

    console.log('tu sam');

    if( parseFloat(value) < 10 ) return { valid : true, reason : "" };
    else return { valid : false, reason : "the value is too big"};

};




// pomocna funkcija
function generateStudent() {

    var imena = [ "Petar", "Milan", "Sasa", "Marko"];
    var prezimena = [ "Petrovic", "Milovanovic", "Markovic", "Sasic"];
    
    return [ { value : Math.floor( Math.random() * 999 + 1 ) + "/" + Math.floor( Math.random() * 99 + 1 ), edit: "no" },
             { value : imena[Math.floor( Math.random() * imena.length) ], edit: "no" },
             { value : prezimena[Math.floor( Math.random() * prezimena.length) ], edit: "no" }
           ];
};



// vraca matricu ocena zajedno sa studentima, matrica odgovara strukturi
// edit can be : "yes", "no", "function"
exports.getData = function( user, id, period ) {
    
    var rez = [];

    for( var i= 0; i < 30; i++ )
    {
        var pomocni = generateStudent();
        for( var j=0; j < 9; j++ )
        {
            pomocni.push( { value : Math.random() * 9 + 1, edit : "yes" } );
        }

        rez.push( pomocni );
    }

    return rez;
};



exports.getStudentsStructure = function(user, id, period ) {
    return [
              { properties : {
                                 id : 1,
                                 name : "Studenti",
                             },
                structure : [
                                { properties : { id : 1, 
                                                 name: "id"
                                               },
                                  structure : [] 
                                },
                                { properties : { id : 2, 
                                                 name: "Name"
                                               },
                                  structure : [] 
                                },
                                { properties : { id : 3, 
                                                 name: "Surname"
                                               },
                                  structure : [] 
                                },
                            ]
              }
           ];
};

// period moze biti null sto oznacava najsvezije
exports.getDataStructure = function(user, id, period ) {
    return [ 
                  { properties : { id : 1,
                                   name: "Kolokvijumi",
                                 }, 
                    structure : [ 
                                      { properties : { id : 1,
                                                       name: "Kol1",
                                                       type: "number"
                                                     },
                                        structure : [
                                                        { properties: { id : 1,
                                                                        name: "zad1",
                                                                        type: "number"
                                                                      },
                                                          structure: []
                                                        },
                                                        { properties : { id : 2,
                                                                         name: "zad2",
                                                                         type: "number"
                                                                       },
                                                          structure: []
                                                        },
                                                        { properties : { id : 3,
                                                                         name: "suma",
                                                                         type: "number"
                                                                       },
                                                          structure: []
                                                        }
                                                    ]  
                                      },
                                      { properties : { id : 2,
                                                       name: "Kol2",
                                                       type: "number"
                                                     }, 
                                        structure : []  
                                      },
                                      { properties : { id : 3,
                                                       name: "Suma",
                                                       type: "number"
                                                     },  
                                        structure : []  
                                      },
                               ]
                  },
                  { properties : { id : 3,
                                   name: "Testovi",
                                   type: "number"
                                 },  
                    structure : [ 
                                      { properties : { id : 1,
                                                       name: "Test1",
                                                       type: "number"
                                                     },  
                                        structure : []  
                                      },
                                      { properties : { id : 2,
                                                       name: "Test2",
                                                       type: "number"
                                                     },  
                                        structure : []  
                                      },
                                      { properties : { id : 3,
                                                       name: "Suma",
                                                       type: "number"
                                                     }, 
                                        structure : []  
                                      },
                                ]
                  },
                  { properties : { id : 2,
                                   name: "Suma",
                                   type: "number"
                                 },
                    structure : []
                  }

         ];
};

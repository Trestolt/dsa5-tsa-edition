// NPC-Import button
on("clicked:importnpc", function () {
    getAttrs(["npc_import"], function (values) {
        
        console.log("Import Triggert");
        var endtoken = 'ENDTOKEN';
        var input = values.npc_import + endtoken;
        //Keywords to look for
        var keywords = ["Größe:", "Gewicht:", "MU", "KL", "IN", "CH", "FF", "GE", "KO", "KK", "LeP", "AsP", "KaP", "INI", "VW", "SK", "ZK", "GS", "RS/BE:", "Aktionen:", "Sonderfertigkeiten:", "Talente:", "Zauber:", "Größenkategorie:", "Typus:", "Anrufungsschwierigkeit:", "Beute:", "Kampfverhalten:", "Flucht:", "Jagd:", "Schmerz +1 bei:", "Sonderregeln:", "Anzahl:", "ENDTOKEN"];
        //array for the results
        var multi = [];

        keywords.forEach(function (key, index, keywords) {
            var newArray = [];
            newArray[0] = key; //add keyword
            newArray[1] = index; //add keyword index
            newArray[2] = input.search(key); //add position in text
            newArray[3] = ''; //result value
            multi[index] = newArray;
            //console.log(multi[index][0]+" inloop "+multi[index][1]);
        });
        
        // sort by position
        multi.sort(function (a, b) {
            var valueA, valueB;
            valueA = a[2]; // Where 1 is your index, from your example
            valueB = b[2];
            if (valueA < valueB) {
                return -1;
            }
            else if (valueA > valueB) {
                return 1;
            }
            return 0;
        });

        // now extract all other elements
        multi.forEach(function (key, index, multi) {
            var start = multi[index][2];
            if (start == -1) { multi[index][3] = '' }
            else {
                if (multi[index][0] == endtoken) {
                    //do nothing
                }
                else {
                    var next = multi[index + 1][2];
                    multi[index][3] = input.substring(start + multi[index][0].length, next).trim();
                     //console.log(key+" inloop "+(start+multi[index][0].length)+" "+next+" "+multi[index][3]);
                }
            }
        });

        // sort back in keyword order
        multi.sort(function (a, b) {
            var valueA, valueB;
            // 1 is the index to sort
            valueA = a[1];
            valueB = b[1];
            if (valueA < valueB) {
                return -1;
            }
            else if (valueA > valueB) {
                return 1;
            }
            return 0;
        });

        //do the output
        multi.forEach(function (row, index, multi) { console.log(multi[index][0] + ' ' + multi[index][3]); });

        setAttrs({
            toggle_npc: 'npc',
            groesse: multi[0][3],
            gewicht: multi[1][3],
            mut: parseInt(multi[2][3])||8,
            klugheit: parseInt(multi[3][3])||8,
            intuition: parseInt(multi[4][3])||8,
            charisma: parseInt(multi[5][3])||8,
            fingerfertigkeit: parseInt(multi[6][3])||8,
            gewandheit: parseInt(multi[7][3])||8,
            konstitution: parseInt(multi[8][3])||8,
            koerperkraft: parseInt(multi[9][3])||8,
            le: parseInt(multi[10][3])||0,
            le_max: parseInt(multi[10][3])||0,
            ae: parseInt(multi[11][3])||0,
            ae_max: parseInt(multi[11][3])||0,
            ke: parseInt(multi[12][3])||0,
            ke_max: parseInt(multi[12][3])||0,
            ini_grundwert: parseInt(multi[13][3])||0,
            aw_grundwert: parseInt(multi[14][3])||0,
            vw_grundwert: parseInt(multi[14][3])||0,
            sk_grundwert: parseInt(multi[15][3])||0,
            zk_grundwert: parseInt(multi[16][3])||0,
            rs_grundwert: parseInt(multi[17][3])||0,
            gs_grundwert: parseInt(multi[18][3])||0,
            schips_grundwert: 0,
            anz_angriffe: parseInt(multi[19][3])||1,
            sonstiges: multi[20][3],
            informationen: multi[21][3],
            groessekategorie: multi[23][3],
            typus: multi[24][3],
            schwierigkeit: multi[25][3],
            beute: multi[26][3],
            kampfverhalten: multi[27][3],
            flucht: multi[28][3],
            jagd:  multi[29][3],
            sonderregeln: multi[31][3],
            anzahl: multi[32][3]
            
            
        });

    });
});	

// "20Sonderfertigkeiten", "21Talente", "22Zauber", "23Größenkategorie", "24Typus", "25Anrufungsschwierigkeit", "26Beute", "27Kampfverhalten", "28Flucht", "29Jagd", "30Schmerz +1 bei:", "31Sonderregeln:", "Waffenlos", "ENDTOKEN"
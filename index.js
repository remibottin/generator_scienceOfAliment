
Questions.prototype.generateQuiz = function() {
    let QCount = 0;
    let QNumber = 0;
 
    // Initialise the "questions available" table
    let QUsed = new Array(6);
    for (QCount=0; QCount<18; QCount++) {
       QUsed[QCount] = 1; // Marked as available
    }
 
    // Delete any existing questions
    //this.nukeExistingQuiz();
    this.anchor.innerHTML = "";
 
    let HTMLBlob = "<table>";
 
    // Build up the questions
    for (QCount=0; QCount<4; ) {
       QNumber = Math.floor(20 * Math.random());
       if (1 == QUsed[QNumber]) { // Still available?
      HTMLBlob += this.AddQuestion(QNumber, QCount);
      QCount++;
          QUsed[QNumber] = 0; // Marked as unavailable
       }
    }
    HTMLBlob += "</table>";
    this.anchor.innerHTML = HTMLBlob;
 }
 
 // This removes any existing quiz on the page
 Questions.prototype.nukeExistingQuiz = function() {
    if (null != this.anchor && null != this.anchor.childCount) {
       while (this.anchor.childCount > 0) {
          this.anchor.removeChild(this.anchor.childNodes[0]);
       }
    }
 }
 
 // Add this to the DOM
 Questions.prototype.AddQuestion = function(QNum, EntryNum) {
    let Ix;
    let HTMLBlob =      "<tr>  <td><input type=\"checkbox\" id=\"check" + EntryNum + "\" checked=\"checked\"></td><td>" 
                       // + "Question #" + QNum + ":</td><td>" 
                        + "<strong>" + this.QText[QNum] + "</strong></td><td><select id=\"answer" + EntryNum + "\" size=\"1\">"
                        + "<option selected=\"selected\" value=\"0\">-- Sélectionnez une réponse --</option>"
    for (Ix=0; Ix<3; Ix++) {
       HTMLBlob = HTMLBlob + "<option value=\"" + Ix + "\">" + this.QChoice[QNum*3+Ix] + "</option>";
    }
    HTMLBlob = HTMLBlob + "</select></td></tr>";
    
    this.thisAns[EntryNum] = this.QAnswer[QNum];
    return HTMLBlob;
 }
 
 
 // Verify that all questions have been answered
 Questions.prototype.AreQuestionsAnswered = function() {
    let unanswered = 0;
    for (let Ix=0; Ix<4; Ix++) {
       this.Answer[Ix] = document.getElementById("answer" + Ix).selectedIndex;
       if (this.Answer[Ix] == 0) {
          unanswered++;
       }
    }
    return unanswered;
 }
 
 // Score the results
 Questions.prototype.ScoreIt = function() {
    let count = this.AreQuestionsAnswered();
    if (count > 0) {
       alert("Il vous manque " + count + " questions à répondre. Veuillez compléter vos réponses.");
       count = 0;
    } else {
       for (let Ix=0; Ix<4; Ix++) {
          if (this.Answer[Ix] == this.thisAns[Ix]) {
             document.getElementById("check" + Ix).checked = false;
             count++;
          } else {
             document.getElementById("check" + Ix).checked = true;
          }
       }
       alert("Bravo vous avez " + count + " réponses juste.");
    }
    return count;
 }

 // refresh the game button and add a next party 



 // data

function Questions(divname) {
   this.QText   = new Array(20); // The questions
   this.QAnswer = new Array(20); // The correct answers
   this.QChoice = new Array(80); // The possible multi-choice values
   this.thisAns = new Array(10); // The answers for this page
   this.Answer  = new Array(10); // The user's answers
   this.anchor = document.getElementById(divname);

   // Questions / 3 Choices / 1 Answer

   //KCAL Enfants
   this.QText[0] = "Combien de KCAL pour un enfant de 1 à 3 ans ?";

   this.QChoice[0] = "1 135";
   this.QChoice[1] = "1 740";
   this.QChoice[2] = "1 430";

   this.QAnswer[0] = 1;

  
   this.QText[1] = "Combien de KCAL pour un enfant de 4 à 5 ans ?";

   this.QChoice[3] = "1 135";
   this.QChoice[4] = "1 740";
   this.QChoice[5] = "1 430";

   this.QAnswer[1] = 3;
   

   this.QText[2] = "Combien de KCAL pour un enfant de 5 à 10 ans ?";

   this.QChoice[6] = "1 135";
   this.QChoice[7] = "1 740";
   this.QChoice[8] = "2 378";

   this.QAnswer[2] = 2;


   //KCAL Ados
   this.QText[3] = "Combien de KCAL pour un ado de 11 à 14 ans ?";

   this.QChoice[9] = "1 135";
   this.QChoice[10] = "2 160";
   this.QChoice[11] = "4 120";

   this.QAnswer[3] = 2;

   
   this.QText[4] = "Combien de KCAL pour un ado de 15 à 17 ans ?";

   this.QChoice[12] = "2 549";
   this.QChoice[13] = "1 120";
   this.QChoice[14] = "2 160";

   this.QAnswer[4] = 1;
   
   //KCAL Adultes
   this.QText[5] = "Combien de KCAL pour une Femme ?";

   this.QChoice[15] = "2 600";
   this.QChoice[16] = "2 100";
   this.QChoice[17] = "1 740";

   this.QAnswer[5] = 2;

   
   this.QText[6] = "Combien de KCAL pour un Homme ?";

   this.QChoice[18] = "2 600";
   this.QChoice[19] = "2 700";
   this.QChoice[20] = "2 450";

   this.QAnswer[6] = 1;

   //KCAL Aged
   
   this.QText[7] = "Combien de KCAL pour un Homme âgé ?";

   this.QChoice[21] = "2 600";
   this.QChoice[22] = "2 308";
   this.QChoice[23] = "2 429";

   this.QAnswer[7] = 2;

   
   this.QText[8] = "Combien de KCAL pour une femme âgée ?";

   this.QChoice[24] = `MÉNAUPOSE 51-59 :  2057
   60-65 : 1 927
   > 65 : 1 878 
   (NAP = 1,63)`;
   this.QChoice[25] = `MÉNAUPOSE 51-59 :  6530
   60-65 : 1 927
   > 65 : 1 878 
   (NAP = 1,63)`;
   this.QChoice[26] = `MÉNAUPOSE 51-59 :  2057
   60-65 : 5 490
   > 65 : 1 439 
   (NAP = 1,63)`;

   this.QAnswer[8] = 1;


   //Proétines Enfants
   this.QText[9] = "Combien de proétines pour un enfant de 1 à 3 ans ?";

   this.QChoice[27] = "6 à 15%";
   this.QChoice[28] = "6 à 40%";
   this.QChoice[29] = "1 à 15%";

   this.QAnswer[9] = 1;

  
   this.QText[10] = "Combien de proétines pour un enfant de 4 à 5 ans ?";

   this.QChoice[30] = "1 à 6%";
   this.QChoice[31] = "6 à 34%";
   this.QChoice[32] = "6 à 16%";

   this.QAnswer[10] = 3;
   

   this.QText[11] = "Combien de proétines pour un enfant de 6 à 9 ans ?";

   this.QChoice[33] = "7 à 17%";
   this.QChoice[34] = "7 à 19%";
   this.QChoice[35] = "7 à 22%";

   this.QAnswer[11] = 1;


   //Proétines Ados
   this.QText[12] = "Combien de proétines pour un ado de 10 à 13 ans ?";

   this.QChoice[36] = "19 à 20%";
   this.QChoice[37] = "9 à 29%";
   this.QChoice[38] = "9 à 19%";

   this.QAnswer[12] = 3;

   
   this.QText[13] = "Combien de proétines pour un ado de 14 à 17 ans ?";

   this.QChoice[39] = "10 à 20%";
   this.QChoice[40] = "8 à 24%";
   this.QChoice[41] = "1 à 2%";

   this.QAnswer[13] = 1;
   
   //Proétines Adultes + Femmes Grossesses
   this.QText[14] = "Combien de proétines pour un adulte ?";

   this.QChoice[42] = `"10 à 12% NAP MOYEN 
   12 à 25% NAP <1,3"`;
   this.QChoice[43] = `"10 à 20% NAP MOYEN 
   12 à 20% NAP <1,5"`;
   this.QChoice[44] = `"10 à 40% NAP MOYEN 
   12 à 20% NAP <1,5"`;

   this.QAnswer[14] = 2;

   
   this.QText[15] = "Combien de proétines pour une femme ( Grossesses / Allaitantes ) ?";

   this.QChoice[45] = "12 à 22 %";
   this.QChoice[46] = "30% à 33%";
   this.QChoice[47] = "12 à 20 %";

   this.QAnswer[15] = 3;

   //Proétines Aged
   
   this.QText[16] = "Combien de proétines pour un(e) Femme / Homme âgé ?";

   this.QChoice[48] = ` 10 à 20% 
   > 65 :  15 à 20 % AET
   (1g / kg)`;
   this.QChoice[49] = ` 10 à 40% 
   > 65 :  15 à 20 % AET
   (1g / kg)`;
   this.QChoice[50] = ` 10 à 30% 
   > 65 :  15 à 80 % AET
   (1g / kg)`;

   this.QAnswer[16] = 1;

   
   this.QText[17] = "Combien de proétines pour une femme ménauposé ?";

   this.QChoice[51] = `<65 ans : 18 à 20 % 
   0,83g/ kg`;
   this.QChoice[52] = `<80 ans : 12 à 20 % 
   0,83g/ kg`;
   this.QChoice[53] = `<65 ans : 12 à 20 % 
   0,83g/ kg`;

   this.QAnswer[17] = 3;

   // KCAL pour Femmes Grossesses Allaitantes 

   this.QText[18] = "Combien de KCAL pour une femme en pleine grossesse ?";

   this.QChoice[54] = `"T1 : + 90 KCAL 
   T2 : +2550 KCAL
   T3 : +1000"`;
   this.QChoice[55] = `"T1 : + 70 KCAL 
   T2 : +260 KCAL
   T3 : +500"`;
   this.QChoice[56] = `"T1 : + 700 KCAL 
   T2 : +260 KCAL
   T3 : +5000"`;

   this.QAnswer[18] = 2;

   this.QText[19] = "Combien de KCAL pour une femme allaitante ?";

   this.QChoice[57] = `500`;
   this.QChoice[58] = `- 500`;
   this.QChoice[59] = `+ 500`;

   this.QAnswer[19] = 3;

      // Lipides

      this.QText[20] = "Combien de lipides pour un enfant de 1 à 3 ans ?";

      this.QChoice[60] = '60 à 76 %';
      this.QChoice[61] = '45 à 50 %';
      this.QChoice[62] = '20 à 35 %';
   
      this.QAnswer[20] = 2;
   
      this.QText[21] = "Combien de lipides pour une enfant / ado de 4 à 17 ans ?";
   
      this.QChoice[63] = '20 à 35 %'
      this.QChoice[64] = '30 à 45 %'
      this.QChoice[65] = '40 à 55 %'
   
      this.QAnswer[21] = 1;

      this.QText[22] = "Combien de lipides pour un adulte ?";
   
      this.QChoice[66] = '35 à 40 %'
      this.QChoice[67] = '67 à 78 %'
      this.QChoice[68] = '40 à 50 %'
   
      this.QAnswer[22] = 1;

         // Glucides

      this.QText[23] = "Combien de glucides pour un enfant de 1 à 3 ans ?";

      this.QChoice[69] = '50 à 55%';
      this.QChoice[70] = '45 à 50 %';
      this.QChoice[71] = '40 à 55% %';
   
      this.QAnswer[23] = 2;
   
      this.QText[24] = "Combien de glucides pour un enfant / ado / adulte ?";
   
      this.QChoice[72] = `"40 à 55%
      HLG : 4-7 ans : 60g / 7 - 10  ans : 75g / > 10 ans : 100g"`;
      this.QChoice[73] = `"40 à 55%
      HLG : 4-7 ans : 60g / 7 - 10  ans : 90g / > 10 ans : 100g"`;
      this.QChoice[74] = `"45 à 65%
      HLG : 4-7 ans : 20g / 7 - 10  ans : 75g / > 10 ans : 100g"`;
   
      this.QAnswer[24] = 1;
   
}

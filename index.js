
Questions.prototype.generateQuiz = function() {
    let QCount = 0;
    let QNumber = 0;
 
    // Initialise the "questions available" table
    let QUsed = new Array(6);
    for (QCount=0; QCount<6; QCount++) {
       QUsed[QCount] = 1; // Marked as available
    }
 
    // Delete any existing questions
    //this.nukeExistingQuiz();
    this.anchor.innerHTML = "";
 
    let HTMLBlob = "<table>";
 
    // Build up the questions
    for (QCount=0; QCount<3; ) {
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
    let HTMLBlob =      "<tr><td><input type=\"checkbox\" id=\"check" + EntryNum + "\" checked=\"checked\"></td><td>"
                       // + "Question #" + QNum + ":</td><td>" 
                        + "<strong>" + this.QText[QNum] + "</strong></td><td><select id=\"answer" + EntryNum + "\" size=\"1\">"
                        + "<option selected=\"selected\" value=\"0\">-- Select an answer --</option>"
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
    for (let Ix=0; Ix<3; Ix++) {
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
       for (let Ix=0; Ix<3; Ix++) {
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

   
   this.QText[6] = "Combien de KCAL pour un Homme?";

   this.QChoice[18] = "2 600";
   this.QChoice[19] = "2 700";
   this.QChoice[20] = "2 450";

   this.QAnswer[4] = 1;
}

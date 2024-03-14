function Questions(divname) {
    this.QText   = new Array(20); // The questions
    this.QAnswer = new Array(20); // The correct answers
    this.QChoice = new Array(80); // The possible multi-choice values
    this.thisAns = new Array(10); // The answers for this page
    this.Answer  = new Array(10); // The user's answers
    this.anchor = document.getElementById(divname);
 
    // Questions / 3 Choices / 1 Answer
    this.QText[0] = "Combien de Lipides pour un Enfant ?";

    this.QChoice[0] = "1";
    this.QChoice[1] = "2";
    this.QChoice[2] = "3";
    this.QChoice[3] = "4";

    this.QAnswer[0] = 3;
   
    this.QText[1] = "Combien de Lipides pour un Adulte ?";

    this.QChoice[4] = "1";
    this.QChoice[5] = "2";
    this.QChoice[6] = "3";
    this.QChoice[7] = "4";

    this.QAnswer[1] = 1;

    this.QText[2] = "Combien de Lipides pour un Ado ?";

    this.QChoice[8] = "1";
    this.QChoice[9] = "2";
    this.QChoice[10] = "3";
    this.QChoice[11] = "4";

    this.QAnswer[2] = 2;
 
 }
 
 Questions.prototype.generateQuiz = function() {
    let QCount = 0;
    let QNumber = 0;
 
    // Initialise the "questions available" table
    let QUsed = new Array(3);
    for (QCount=0; QCount<3; QCount++) {
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
    let HTMLBlob = "<tr><td><input type=\"checkbox\" id=\"check" + EntryNum + "\" checked=\"checked\"></td><td>"
                        + "Question #" + QNum + ":</td><td>"
                        + "<strong>" + this.QText[QNum] + "</strong></td><td><select id=\"answer" + EntryNum + "\" size=\"1\">"
                        + "<option selected=\"selected\" value=\"0\">-- Select an answer --</option>"
    for (Ix=0; Ix<4; Ix++) {
       HTMLBlob = HTMLBlob + "<option value=\"" + Ix + "\">" + this.QChoice[QNum*4+Ix] + "</option>";
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

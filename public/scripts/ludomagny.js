document.addEventListener("DOMContentLoaded", function(){

    var DateTime = luxon.DateTime;
    const currentDate = DateTime.now();
    // const currentDate = DateTime.fromISO('2024-11-02');

    const header = document.getElementById('header')
    const dateSoirees =  Array.from(document.getElementsByClassName("date-soiree"));

    // easter-egg
    if (currentDate.month == 11)
        header.classList.replace("playful","creepy");
    else if (currentDate.month == 12)
        header.classList.replace("playful","festive");

    const diffs = [];
    for (const [index, element] of dateSoirees.entries()) {

        const slideDate = DateTime.fromFormat(element.textContent, "dd LLLL yyyy", { locale: "fr" });
        const diff = slideDate.diff(currentDate, 'days').as('days');
        diffs.push(diff);
        if (diff == 0) {
            element.classList.add("aujourdhui");
        } else if (diff > 0) {
            element.classList.add("a-venir");
        } else {
            element.classList.add("passee");
        }
    }
    var next_index = -1;
    for (const [index, el] of diffs.entries()) {
        if (el >= 0)
        {
            next_index = index;
            break;
        }
    }

    if (next_index < 0)
    {
        document.getElementsByClassName("soirees")[0].classList.add("hidden");
    }
    else
    {
        dateSoirees[next_index].classList.replace("aujourdhui","prochaine");
        dateSoirees[next_index].classList.replace("a-venir","prochaine");
    }

});
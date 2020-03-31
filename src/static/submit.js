function submitInformation() {
    const totalInput = document.getElementById('totalVar').value;
    const idealInput = document.getElementById("idealVar").value;
    const homicideInput = document.getElementById('homicideVar').value;
    const shootingInput = document.getElementById('shootingVar').value;
    const censusInput = document.getElementById('censusVar').value;
    const volunteerInput = document.getElementById('volunteerVar').value;

    // this should be a fetch call
    console.log(totalInput, idealInput, homicideInput, shootingInput, censusInput, volunteerInput);

    const before = document.getElementById("mainOptions");
    const after = document.getElementById("mainGraphic");

    before.style.display = 'none';
    after.style.display = 'block';
}
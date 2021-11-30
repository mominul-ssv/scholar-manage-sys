exports.Registration = function (data) {
    let degree = "";
    let degreeShort = "";
    let major = "";
    let credits = 0;
    switch (data) {
        case "b-arch":
            degree = "Bachelor of Architecture";
            degreeShort = "B.Arch.";
            major = "Architecture";
            credits = 170;
            break;
        case "bs-cee":
            degree = "Bachelor of Science";
            degreeShort = "BS";
            major = "Civil & Environmental Engineering";
            credits = 149;
            break;
        case "bs-cse":
            degree = "Bachelor of Science";
            degreeShort = "BS";
            major = "Computer Science & Engineering";
            credits = 130;
            break;
        case "bs-eee":
            degree = "Bachelor of Science";
            degreeShort = "BS";
            major = "Electrical & Electronic Engineering";
            credits = 130;
            break;
        case "bs-ete":
            degree = "Bachelor of Science";
            degreeShort = "BS";
            major = "Electronic & Telecommunication Engineering";
            credits = 130;
            break;
        case "bs-eco":
            degree = "Bachelor of Science";
            degreeShort = "BS";
            major = "Economics";
            credits = 125;
            break;
        case "bs-bba-accounting":
            degree = "Bachelor of Business Administration";
            degreeShort = "BBA";
            major = "Accounting";
            credits = 120;
            break;
        case "bs-bba-economics":
            degree = "Bachelor of Business Administration";
            degreeShort = "BBA";
            major = "Economics";
            credits = 124;
            break;
        case "bs-bba-marketing":
            degree = "Bachelor of Business Administration";
            degreeShort = "BBA";
            major = "Marketing";
            credits = 130;
            break;
        case "ba-eng":
            degree = "Bachelor of Arts";
            degreeShort = "BA";
            major = "English";
            credits = 123;
            break;
        case "b-llb":
            degree = "Bachelor of Laws";
            degreeShort = "LLB";
            major = "LL.B Honors";
            credits = 130;
            break;
        case "bs-biology":
            degree = "Bachelor of Science";
            degreeShort = "BS";
            major = "Biochemistry and Biotechnology";
            credits = 120;
            break;
        case "bs-microbiology":
            degree = "Bachelor of Science";
            degreeShort = "BS";
            major = "Microbiology";
            credits = 120;
            break;
        case "b-pharma":
            degree = "Bachelor of Pharmacy";
            degreeShort = "BPharm";
            major = "BPharm Professional";
            credits = 199;
            break;
        default:
            degree = "";
            degreeShort = "";
            major = "";
            credits = 0;
    }
    return {
        degree: degree,
        degreeShort: degreeShort,
        major: major,
        credits: credits
    };
}
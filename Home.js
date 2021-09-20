import React, { useState, useEffect } from "react";
// import Boot from "../images/boot3.jpg";
// import Common from "./Common";
import dictionary from "./Dummy";
import axios from "axios";

import './Style.css';

function Home() {
  const [number, setNumber] = useState([]);
  const [accomplishment, setAccomplishment] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skill, setSkill] = useState([]);
  const [city, setCity] = useState("");
  const [country, setCountary] = useState("");
  const [about, setAbout] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [otherEmail, setOtherEmail] = useState("");
  const [object, setObject] = useState({});
  const [flag, setFlag] = useState(true);
  const [resume, setResume] = useState({ resume: "" });
  const [displayFlag, setDisplayFlag] = useState(true);
  const [oldObject, setOldObject] = useState([])
  const [newObject, setNewObject] = useState([])
  //const  [stringData, setString]
  var formData = new FormData();

  const parseConvert = () => {
      console.log("value of object is", object);
    if (object.Mobile_number) {
      setNumber(object.Mobile_number);
    }

    if (object.Accomplishments) {
      setAccomplishment(object.Accomplishments);
    }

    if (object.Experence) {
      setExperience(object.Experence);
    }

    if (object.Education) {
      setEducation(object.Education);
    }

    if (object.Skills) {
      setSkill(object.Skills);
    }
  };
  const mobileUI = () => {
    var filed;
    if (number.length != 0) {
      number.map((index, element) => {
        filed = <div>{index}</div>;
        //   console.log("field is", filed, element, index);
        return <input />;
      });
    }
  };

  const handleResumeSelect = (e) => {
    console.log("event value is", e.target.files[0]);
    // var formData = new FormData();
    // formData.append('file',e.target.files[0]);
    setResume(e.target.files[0]);
    resumeUpload();
  };

  const resumeUpload = () => {
    // var formData = new FormData();
    var formData = new FormData();
    formData.append("file", resume);
    // formData.append("file",resume);
    // var options = { content: formData };

    console.log("resume file", formData, resume);
    axios
      .post(
        "http://e945-103-15-67-125.ngrok.io/",
        formData
      )
      .then((response) => {
        setObject(response.data);
        setObject(response.data)
        setDisplayFlag(true);

      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleSubmit = () => {
    const data = {
      About_Me: about == "" && object.About_Me ? object.About_Me : about,
      Accomplishments:
        accomplishment == "" && object.Accomplishments
          ? object.Accomplishments
          : accomplishment,
      City: city == "" && object.City ? object.City : city,
      Country: country == "" && object.Country ? object.Country : country,
      Education:
        education == "" && object.Education ? object.Education : education,
      Experence:
        experience == "" && object.Experence ? object.Experence : experience,
      Github: github == "" && object.Github ? object.Github : github,
      Linkedin: linkedin == "" && object.Linkedin ? object.Linkedin : linkedin,
      Mobile_number:
        number == "" && object.Mobile_number ? object.Mobile_number : number,
      Other_mails:
        otherEmail == "" && object.Other_mails
          ? object.Other_mails
          : otherEmail,
      Skills: skill == "" && object.Skills ? object.Skills : skill,
    };
    console.log("final updated data", data);
    setNewObject(data);

    var resumeObject = {
      old : oldObject,
      new : data  
    }
    console.log('old new resume', resumeObject)
  
  };

  
  const handleChange = (value, method) => {
    console.log("onchage value is", value.target.value);
    method(value.target.value);
  };

  useEffect(() => {
    if (Object.keys(object).length == 0) {
      setObject(dictionary);
      setOldObject(dictionary);
      console.log("useEffect");
    }
    parseConvert();
  });

  console.log("updateed city is", city);
  return (
    <div className="container-fluid nav_bg backbround">
      <div className="row">
        {flag ? (
          <div className="col-8 mx-auto mt-5 ">
            <div className="col-12 btnDiv">
              <input
                type="file"
                id="docpicker"
                accept=".pdf"
                onChange={(e) => {
                  handleResumeSelect(e);
                }}
                id="file"
              />
              <label for="file">Upload Resume</label>
            </div>
            <br / >
            <br />
            <button className="clickEvent" onClick={handleSubmit}>Update Resume </button>
            <br/> <br/>
            <div className="flex col-12 justifySpaceBetween marginBottom">
              <div className="col-4">
                <div className="flex">
                  <div className="inputfieldText widthHead"> City: </div>
                  {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"  /> */}
                  {/* <input type="text" onChange={(e) => setCity(e.target.value)} id="requested" name="requested" ref="requested" />                          */}
                  {object.City != "" ? (
                    <input
                      defaultValue={object.City}
                      onChange={(e) => handleChange(e, setCity)}
                      className="form-control me-2"
                    />
                  ) : null}
                </div>
              </div>
              {console.log("city value is", city)}
              <div className="col-4">
                <div className="flex">
                  <div className="inputfieldText widthHead"> Country: </div>
                  {/* <input value={city} onChange={(e) => setCountary(e.target.value)} className="form-control me-2"/> */}
                  {object.Country != "" ? (
                    <input
                      defaultValue={object.Country}
                      onChange={(e) => handleChange(e, setCountary)}
                      className="form-control me-2"
                    />
                  ) : null}
                </div>
              </div>
            </div>

            <h3 className="col-8">
              <div className="flex">
                <div className="inputfieldText "> About: </div>
                {object.About_Me != "" ? (
                  <textarea
                    defaultValue={object.About_Me}
                    onChange={(e) => handleChange(e, setAbout)}
                    className="form-control me-2 textAreaAboutFIeld"
                    rows="4"
                    cols="50"
                  />
                ) : null}
              </div>
            </h3>
            {displayFlag ? (
              <>
                <h3 className="inputfieldText marginBottom">
                  {" "}
                  Mobile:{" "}
                  <div className="flex col-10">
                    {number.map((element, index) => {
                      //   console.log("number is ", element, index);
                      return (
                        <div className="col-6">
                          <input
                            defaultValue={element}
                            className="multipleFields form-control me-2"
                            id={index}
                            onChange={(e) => {
                              number[e.target.id] = e.target.value;
                              setNumber(number);
                            }}
                          />
                        </div>
                      );
                    })}{" "}
                  </div>
                </h3>
                <h3 className="col-8 marginBottom">
                  <div className="flex">
                    <div className="inputfieldText">
                      {" "}
                      Accomplishments:
                      {accomplishment.map((element, index) => {
                        return (
                          <div>
                            <div className="inputfieldSubText flex col-10">
                              {" "}
                              <div className="marginLeft col-2">
                                Certificate :{" "}
                              </div>
                              <div className="col-10 ">
                                <input
                                  defaultValue={element.Certificate}
                                  className="form-control me-2 acomWidth marginLeft "
                                  id={index}
                                  onChange={(e) => {
                                    accomplishment[e.target.id].Certificate =
                                      e.target.value;
                                    console.log("acompolish", accomplishment);
                                    setAccomplishment(accomplishment);
                                  }}
                                />{" "}
                              </div>
                            </div>
                            <div className="inputfieldSubText flex col-8">
                              <div className="col-3 marginLeft">
                                Organisation :{" "}
                              </div>
                              <div className="col-10">
                                <input
                                  defaultValue={element.Organisation}
                                  className="form-control me-2 acomWidth"
                                  id={index}
                                  onChange={(e) => {
                                    accomplishment[e.target.id].Organisation =
                                      e.target.value;
                                    console.log("acompolish", accomplishment);
                                    setAccomplishment(accomplishment);
                                  }}
                                />{" "}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </h3>
                <h3 className="col-8">
                  <div className="flex">
                    <div className="inputfieldText">
                      <div> Work Experience:</div>
                      {experience.map((element, index) => {
                        return (
                          <div className="experienceDiv">
                            <div className="inputfieldSubText flex ">
                              <div className="col-2"> Company : </div>
                              <div>
                                <input
                                  defaultValue={element.Company}
                                  className="form-control me-2"
                                  id={index}
                                  onChange={(e) => {
                                    experience[e.target.id].Company =
                                      e.target.value;
                                    setExperience(experience);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="inputfieldSubText flex">
                              <div className="col-2">Description : </div>
                              <textarea
                                defaultValue={element.Description}
                                className="form-control me-2 textAreaAboutFIeld"
                                rows="4"
                                cols="50"
                                id={index}
                                onChange={(e) => {
                                  experience[e.target.id].Description =
                                    e.target.value;
                                  setExperience(experience);
                                }}
                              />
                            </div>
                            <div className="inputfieldSubText flex">
                              <div className="col-2">Designation : </div>
                              <input
                                defaultValue={element.Designation}
                                className="form-control me-2"
                                id={index}
                                onChange={(e) => {
                                  experience[e.target.id].Designation =
                                    e.target.value;
                                  setExperience(experience);
                                }}
                              />
                            </div>
                            <div className="inputfieldSubText flex">
                              <div className="col-2"> Start from : </div>
                              <input
                                defaultValue={element.from}
                                className="form-control me-2"
                                id={index}
                                onChange={(e) => {
                                  experience[e.target.id].from = e.target.value;
                                  setExperience(experience);
                                }}
                              />
                            </div>
                            <div className="inputfieldSubText flex">
                              <div className="col-2">End to : </div>
                              <input
                                defaultValue={element.to}
                                className="form-control me-2"
                                id={index}
                                onChange={(e) => {
                                  experience[e.target.id].to = e.target.value;
                                  setExperience(experience);
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </h3>
                <h3 className="col-8">
                  <div className="flex">
                    <div className="inputfieldText col-10">
                      {" "}
                      Education:
                      {education.map((element, index) => {
                        return (
                          <div>
                            <div className="inputfieldSubText flex">
                              <div className="col-2 marginLeft">
                                {" "}
                                Institute :{" "}
                              </div>
                              <input
                                defaultValue={element.Institute}
                                className="form-control me-2 col-9"
                                id={index}
                                onChange={(e) => {
                                  education[e.target.id].Institute =
                                    e.target.value;
                                  setEducation(education);
                                }}
                              />{" "}
                            </div>
                            <div className="inputfieldSubText flex">
                              <div className="col-3 ">Specialization : </div>
                              <div className="col-12">
                                <input
                                  defaultValue={element.Specialization}
                                  className="form-control me-2 col-2 "
                                  id={index}
                                  onChange={(e) => {
                                    education[e.target.id].Specialization =
                                      e.target.value;
                                    setEducation(education);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="inputfieldSubText flex">
                              <div className="col-3">Degree : </div>
                              <input
                                defaultValue={element.Degree}
                                className="form-control me-2"
                                id={index}
                                onChange={(e) => {
                                  education[e.target.id].Degree =
                                    e.target.value;
                                  setEducation(education);
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </h3>
                <h3 className="col-8 marginBottom">
                  <div className="flex">
                    <div className="inputfieldText ">
                      {" "}
                      Skills:
                      <div className="flex col-10">
                        {skill.map((element, index) => {
                          return (
                            <div className="col-4">
                              {" "}
                              {/* <div className="inputfieldSubText">{index}:</div> */}
                              <input
                                defaultValue={element}
                                className="form-control me-2"
                                id={index}
                                onChange={(e) => {
                                  skill[e.target.id] = e.target.value;
                                  setSkill(skill);
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </h3>
              </>
            ) : null}
            <h3 className="col-8 marginBottom">
              <div className="flex">
                <div className="inputfieldText"> Github: </div>
                {object.Github != "" ? (
                  <div className="marginLeft col-10">
                    <input
                      defaultValue={object.Github}
                      onChange={(e) => handleChange(e, setGithub)}
                      className="form-control marginLeft"
                    />
                  </div>
                ) : null}
              </div>
            </h3>
            <h3 className="col-8 marginBottom">
              <div className="flex col-10">
                <div className="inputfieldText"> Linkedin: </div>
                {object.Linkedin != "" ? (
                  <input
                    defaultValue={object.Linkedin}
                    onChange={(e) => handleChange(e, setLinkedin)}
                    className="form-control marginLeft col-6"
                  />
                ) : null}
              </div>
            </h3>
            <h3 className="col-6 marginBottom">
              <div className="flex">
                <div className="inputfieldText col-3"> Other Email: </div>
                {object.Other_mails != "" ? (
                  <div className="col-10">
                    <input
                      defaultValue={object.Other_mails}
                      onChange={(e) => handleChange(e, setOtherEmail)}
                      className="form-control "
                    />
                  </div>
                ) : null}
              </div>
            </h3>

            <h3></h3>
          </div>
        ) : (
          <div className="col-8 mx-auto mt-5">
            <div className="col-5 mx-auto mainFont">Upload Resume Feature </div>
            <div className=" mx-auto mt-5 flex justifyCenter ">
              {/* <input  /> */}

              <input
                type="file"
                id="docpicker"
                accept=".pdf"
                onChange={(e) => {
                  handleResumeSelect(e);
                }}
                id="file"
              />
              <label for="file">Upload Resume</label>

              {console.log("resume is", resume)}
              {/* <button className="col-2 btn btn-outline-success" onClick={resumeUpload}>
                Upload Resume
              </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

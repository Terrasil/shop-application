import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
//import { Link } from "react-router-dom";
import Select from 'react-select'
import axios from "axios";

import {Opis} from './komponenty'

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.przeliczanie = this.przeliczanie.bind(this)
    this.requestCreator = this.requestCreator.bind(this)

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }


  przeliczanie(tutoriale){
    console.log(tutoriale)
    let _tutoriale = [];
    for(const tut in tutoriale){
      let _tut = {}
      axios.get(process.env.REACT_APP_EXCHANGE_SERVICE_ADDRESS.length ? process.env.REACT_APP_EXCHANGE_SERVICE_ADDRESS+"/?value=" +tutoriale[tut].price + "&from=" + tutoriale[tut].currency.toLowerCase() + "&to=pln" : 'http://localhost:8081/'+"/?value=" +tutoriale[tut].price + "&from=" + tutoriale[tut].currency.toLowerCase() + "&to=pln")
      .then((response) => {
        console.log(response)
        _tut = tutoriale[tut]
        _tut.przeliczone = response.data.toFixed(2)
        _tutoriale.push(_tut)
      });
    }
    console.log(_tutoriale)
    return _tutoriale
  }

  requestCreator(reqs){
    let reqArray = []
    for(let r in reqs){
      reqArray.push(axios.get(reqs[r]))
    }
    return reqArray
  }
  // Odwołanie do pliku tutorial.service.js w folderze service a z niego pobrane są dane z bazy
  retrieveTutorials() {
    TutorialDataService.getAll()
      .then(response => {
        let _requests = [];
        for(let tut in response.data){
          _requests.push(process.env.REACT_APP_EXCHANGE_SERVICE_ADDRESS.length ? process.env.REACT_APP_EXCHANGE_SERVICE_ADDRESS+"/?value=" +response.data[tut].price + "&from=" + response.data[tut].currency.toLowerCase() + "&to=pln" : 'http://localhost:8081/'+"/?value=" +response.data[tut].price + "&from=" + response.data[tut].currency.toLowerCase() + "&to=pln")
        }
        axios.all(this.requestCreator(_requests)).then(axios.spread((...responses) => {
          console.log(responses)
          for(let res in responses){
            response.data[res].przeliczone = responses[res].data.toFixed(2)
          }
          this.setState({
            tutorials: response.data.reverse()
          });
        })).catch(errors => {
          console.log(errors);
        })
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeAllTutorials() {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchTitle() {
    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        let _requests = [];
        for(let tut in response.data){
          _requests.push(process.env.REACT_APP_EXCHANGE_SERVICE_ADDRESS.length ? process.env.REACT_APP_EXCHANGE_SERVICE_ADDRESS+"/?value=" +response.data[tut].price + "&from=" + response.data[tut].currency.toLowerCase() + "&to=pln" : 'http://localhost:8081/'+"/?value=" +response.data[tut].price + "&from=" + response.data[tut].currency.toLowerCase() + "&to=pln")
        }
        axios.all(this.requestCreator(_requests)).then(axios.spread((...responses) => {
          console.log(responses)
          for(let res in responses){
            response.data[res].przeliczone = responses[res].data.toFixed(2)
          }
          this.setState({
            tutorials: response.data.reverse()
          });
        })).catch(errors => {
          console.log(errors);
        })
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tutorials/*, currentTutorial, currentIndex */} = this.state;

    return (
      <div class="w-75 mx-auto">
        <div className="list row">
          <div className="wyszukiwarka">
            <div className="input-group mb-3 shadow">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.searchTitle}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div><br/>
        {tutorials.map(function(dane){
          return(
            <a href={"/edytuj/"+dane.id}>
              <div class="element shadow mb-5">
                <div class="row">
                  <div class="col-md-3 text-center">
                    {(() => {
                        if (dane.upload.indexOf(process.env.REACT_APP_API_ADDRESS.length ? process.env.REACT_APP_API_ADDRESS : 'http://localhost:8000')) {
                            return (
                              <img  alt="alt" class="show img-fluid" src={searchTitle==="" ? dane.upload = (process.env.REACT_APP_API_ADDRESS.length ? process.env.REACT_APP_API_ADDRESS + dane.upload : 'http://localhost:8000'+ dane.upload) : dane.upload = dane.upload} alt={dane.title}/>
                            )
                        }else{
                            return (
                                <img  alt="alt" class="show img-fluid" src={dane.upload} alt={dane.title}/>
                            )
                        }
                    })()}
                  </div>
                  <div class="col-md-9 p-5">
                    <Opis informacje={dane}></Opis>
                  </div>
                </div>
              </div>
            </a>
          )
        })
      }
      </div>
    );
  }
}
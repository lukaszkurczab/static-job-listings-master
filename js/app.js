class App extends React.Component {
  state = {
    filters: [],
    showFilters: false,
    offerts: [],
    isLoaded: false,
    languagesList: ["Python", "Ruby", "JavaScript", "HTML", "CSS"],
  }

  componentDidMount() {
    fetch('../data.json')
      .then(response => response.json())
      .then(data => {
        this.setState({
          offerts: data,
          isLoaded: true
        })
      })
  }

  clearFilters = () => {
    this.setState({
      filters: [],
      showFilters: false
    });
  }

  addFilter = filter => {
    if (!this.state.filters.includes(filter)) {
      this.setState({
        filters: this.state.filters.concat(filter),
        showFilters: true
      })
    }
  }

  removeFilter = filter => {
    function isNotRemoved(isRemoved) {
      return isRemoved != filter
    }
    this.setState({
      filters: this.state.filters.filter(isNotRemoved),
      showFilters: this.state.filters.length == 1 ? false : true
    })
  }


  render() {
    const offerts = this.state.offerts.map(offert =>
      (
        <Offert key={offert.id}
          company={offert.company}
          logo={offert.logo}
          new={offert.new}
          featured={offert.featured}
          position={offert.position}
          role={offert.role}
          level={offert.level}
          postedAt={offert.postedAt}
          contract={offert.contract}
          location={offert.location}
          languages={offert.languages}
          tools={offert.tools}
          addFilter={this.addFilter}
          filters={this.state.filters}
          languagesList={this.state.languagesList}
        />
      )
    )

    return (
      <>
        <div className={`filtersBox ${this.state.showFilters ? '' : 'invisibility'}`}>
          <div className="filtersBox__filters">
            <Filters filters={this.state.filters} removeFilter={this.removeFilter} />
          </div>
          <button className="filtersBox__filtersClearBtn" onClick={this.clearFilters}>Clear</button>
        </div>
        {this.state.isLoaded ? offerts : ""}
      </>
    )
  }
}

const Filters = props => {
  return (
    props.filters.map(filter => (
      <Filter filter={filter} removeFilter={props.removeFilter} />
    ))
  )
}

const Filter = props => {
  return (
    <>
      <div className="commonText">{props.filter}</div>
      <img src="../images/icon-remove.svg" className="filterRemove" onClick={() => props.removeFilter(props.filter)} />
    </>
  )
}

const Offert = props => {

  let includesFilters;

  function isIncluded(item) {
    return ((props.languages != undefined ? props.languages.includes(item) : false) || (props.tools != undefined ? props.tools.includes(item) : false))
  }

  if (props.filters.every(isIncluded)) {
    includesFilters = true
  }

  // if (props.filters.length == 0 || !includesFilters == true) {
  const showBox = props.filters.length == 0 || includesFilters == true

  if (showBox) {
    return (
      <div className={`offertBox ${props.featured ? "featuredOffertBox" : null}`} >
        <img src={props.logo} alt="" class="offertBox__brandLogo" />
        <section className={`offertBox__header `}>
          <h2 className="commonText">{props.company}</h2>
          {props.new ? <span className="newLabel labels">NEW!</span> : null}
          {props.featured ? <span className="featuredLabel labels">FEATURED</span> : null}
        </section>
        <h1 className="offertBox__offertTitle">{props.position}</h1>
        <ul className="offertBox__list">
          <li className="offertBox__listItem">{props.postedAt}</li>
          <li className="offertBox__listItem">{props.contract}</li>
          <li className="offertBox__listItem">{props.location}</li>
        </ul>
        <div className="offertBox__offertDetails">
          {props.languages ? props.languages.map(language => <h2 className="commonText" onClick={() => props.addFilter(language)}>{language}</h2>) : null}
          {props.tools ? props.tools.map(tool => <h2 className="commonText" onClick={() => props.addFilter(tool)}>{tool}</h2>) : null}
        </div>
      </div >
    )
  } else {
    return null
  }
  //   } else {
  //     return null
  //   }
}

ReactDOM.render(<App />, document.getElementById('root'))

// props.filters.length != 0 && props.filters.indexOf(props.tool)
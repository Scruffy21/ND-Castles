import React from 'react'

const countries = ["ALL", "GBR", "TUR", "CZE", "DEU", "AUS", "FRA", "USA", "LUX", "IRL", "NLD", "BEL", "AUT", "JPN", "LTU", "IRN", "LVA", "BLR", "FIN", "ITA", "SWE", "CAN", "POL", "PRT", "RUS", "ROU", "NOR", "DNK", "HRV", "ZAF", "PRI", "HUN", "UKR", "CYP", "CHE", "NZL", "SVK", "ISR", "GHA", "SVN", "SYR", "ESP", "GRC", "ALB", "BIH", "CHN", "MEX", "JAM", "KOR", "ATA", "EST", "JOR", "SAU", "IND", "SRB", "LBN", "NAM", "ARM", "AFG", "CUB", "VNM", "MNG", "BMU", "RKS", "EGY", "DOM", "CHL", "ARG", "AZE", "THA", "IRQ", "YEM", "PRK", "GTM", "NGA", "IDN", "GEO", "GRL", "TTO", "LKA", "TWN", "ZWE", "unknown"];

class IsoSearch extends React.Component {

    render() {
        return (
            <div className="country-filter-container">
                <label htmlFor="country-filter">Filter castles by country code:</label>
                <select value={this.props.countryFilter} id="country-filter" onChange={event => this.props.filterByCountry(event.target.value)} >
                    {countries.map(country => {
                        return (<option value={country} key={country}>{country}</option>)
                    })}
                    </select>
            </div>
        )
    }
}

export default IsoSearch

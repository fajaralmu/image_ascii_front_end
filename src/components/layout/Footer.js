import React, { Component } from 'react';

class Footer extends Component {

    render(){
        return(
            <footer className="footer has-background-dark">
			<div className="container">
				<div className="content has-text-centered">
					<div className="columns is-mobile is-centered">
						<div className="field is-grouped is-grouped-multiline">
							<div className="control">
								<div className="tags has-addons">
									<a className="tag is-link" href="https://kafila.sch.id">KIIS Jakarta</a>
									<span className="tag is-light">&copy; Kafila Console 2020</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
        );
    }
}

export default Footer;
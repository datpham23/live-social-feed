var React = require('react/addons');

var Navbar = React.createClass({
  render:function(){
    return (
      <div>
        <nav id="globalheader" className="globalheader hidden-sm hidden-xs" role="navigation" aria-label="Global Navigation" data-hires="false" data-analytics-region="global nav" lang="en-US">
          <div id="gh-content" className="gh-content">
            <ul className="gh-menu">
              <li id="gh-menu-icon-toggle" className="gh-menu-icon gh-menu-icon-toggle enhance">
                <button id="gh-svg-icons" className="gh-svg-wrapper">
                  <span className="gh-text-replace">Menu</span>
                  <svg x="0px" y="0px" width="100%" viewBox="0 0 96 96" className="gh-svg gh-svg-top" enable-background="new 0 0 96 96">
                    <rect width="32" height="4" x="32" y="46" className="gh-svg-rect gh-svg-rect-top"></rect>
                  </svg>
                  <svg x="0px" y="0px" width="100%" viewBox="0 0 96 96" className="gh-svg gh-svg-bottom" enable-background="new 0 0 96 96">
                    <rect width="32" height="4" x="32" y="46" className="gh-svg-rect gh-svg-rect-bottom"></rect>
                  </svg>
                </button>
              </li>
              <li id="gh-menu-icon-home" className="gh-menu-icon gh-menu-icon-home">
                <a href="/" onclick="s_objectID=&quot;http://www.apple.com/_1&quot;;return this.s_oc?this.s_oc(e):true">
                  <span className="gh-text-replace">Apple</span>
                </a>
              </li>
            </ul>
            <div className="gh-nav">
              <div className="gh-nav-view">
                <ul className="gh-nav-list">
                  <li className="gh-tab gh-tab-apple">
                    <a className="gh-tab-link" href="/" data-analytics-click="prefix:t,prop3:Apple" onclick="s_objectID=&quot;http://www.apple.com/_2&quot;;return this.s_oc?this.s_oc(e):true">
                      <i className="fa fa-apple apple-icon"></i>
                    </a>
                  </li>
                  <li className="gh-tab gh-tab-store">
                    <a className="gh-tab-link" href="http://store.apple.com/us" data-analytics-click="prefix:t,prop3:Store" onclick="s_objectID=&quot;http://store.apple.com/us_1&quot;;return this.s_oc?this.s_oc(e):true">
                      <span className="gh-tab-inner">
                        <span className="gh-text-replace">Store</span>
                      </span>
                    </a>
                  </li>
                  <li className="gh-tab gh-tab-mac">
                    <a className="gh-tab-link" href="/mac/" data-analytics-click="prefix:t,prop3:Mac" onclick="s_objectID=&quot;http://www.apple.com/mac/_1&quot;;return this.s_oc?this.s_oc(e):true">
                      <span className="gh-tab-inner">
                        <span className="gh-text-replace">Mac</span>
                      </span>
                    </a>
                  </li>
                  <li className="gh-tab gh-tab-iphone">
                    <a className="gh-tab-link" href="/iphone/" data-analytics-click="prefix:t,prop3:iPhone" onclick="s_objectID=&quot;http://www.apple.com/iphone/_1&quot;;return this.s_oc?this.s_oc(e):true">
                      <span className="gh-tab-inner">
                        <span className="gh-text-replace">iPhone</span>
                      </span>
                    </a>
                  </li>
                  <li className="gh-tab gh-tab-watch">
                    <a className="gh-tab-link" href="/watch/" data-analytics-click="prefix:t,prop3:Watch" onclick="s_objectID=&quot;http://www.apple.com/watch/_1&quot;;return this.s_oc?this.s_oc(e):true">
                      <span className="gh-tab-inner">
                        <span className="gh-text-replace">Watch</span>
                      </span>
                    </a>
                  </li>
                  <li className="gh-tab gh-tab-ipad">
                    <a className="gh-tab-link" href="/ipad/" data-analytics-click="prefix:t,prop3:iPad" onclick="s_objectID=&quot;http://www.apple.com/ipad/_1&quot;;return this.s_oc?this.s_oc(e):true">
                      <span className="gh-tab-inner">
                        <span className="gh-text-replace">iPad</span>
                      </span>
                    </a>
                  </li>
                  <li className="gh-tab gh-tab-ipod">
                    <a className="gh-tab-link" href="/ipod/" data-analytics-click="prefix:t,prop3:iPod" onclick="s_objectID=&quot;http://www.apple.com/ipod/_1&quot;;return this.s_oc?this.s_oc(e):true">
                      <span className="gh-tab-inner">
                        <span className="gh-text-replace">iPod</span>
                      </span>
                    </a>
                  </li>
                  <li className="gh-tab gh-tab-itunes">
                    <a className="gh-tab-link" href="/itunes/" data-analytics-click="prefix:t,prop3:iTunes" onclick="s_objectID=&quot;http://www.apple.com/itunes/_1&quot;;return this.s_oc?this.s_oc(e):true">
                      <span className="gh-tab-inner">
                        <span className="gh-text-replace">iTunes</span>
                      </span>
                    </a>
                  </li>
                  <li className="gh-tab gh-tab-support">
                    <a className="gh-tab-link" href="/support/" data-analytics-click="prefix:t,prop3:Support" onclick="s_objectID=&quot;http://www.apple.com/support/_1&quot;;return this.s_oc?this.s_oc(e):true">
                      <span className="gh-tab-inner">
                        <span className="gh-text-replace">Support</span>
                      </span>
                    </a>
                  </li>
                  <li id="gh-tab-search" className="gh-tab gh-tab-search enhance">
                    <div id="gh-search" className="gh-search" role="search">
                      <form action="http://www.apple.com/search/" method="post" className="gh-search-form" id="gh-search-form" data-search-recommended-results="{&quot;url&quot;:&quot;/global/nav/scripts/shortcuts.php&quot;,&quot;requestName&quot;:&quot;recommendedResults&quot;,&quot;queryName&quot;:&quot;q&quot;,&quot;dataType&quot;:&quot;xml&quot;}" data-search-suggested-searches="{&quot;url&quot;:&quot;/search/instant/getSuggestions&quot;,&quot;requestName&quot;:&quot;suggestedSearches&quot;,&quot;queryName&quot;:&quot;query&quot;,&quot;queryParams&quot;:{&quot;model&quot;:&quot;marcom_en_US&quot;,&quot;locale&quot;:&quot;en_US&quot;},&quot;dataType&quot;:&quot;json&quot;}" role="search">
                        <div className="gh-search-input-wrapper">
                          <label for="gh-search-input" className="gh-text-replace">Search apple.com</label>
                          <input type="text" name="q" id="gh-search-input" className="gh-search-input" placeholder="Search apple.com" autocomplete="off" autocorrect="off" autocapitalize="off"/>
                        </div>
                        <button disabled="disabled" type="submit" id="gh-search-submit" className="gh-search-submit gh-search-magnify"><span className="gh-text-replace">Search apple.com</span></button>
                        <button disabled="disabled" type="reset" id="gh-search-reset" className="gh-search-reset"><span className="gh-text-replace">Reset</span></button>
                      </form>
                    </div>
                    <a className="gh-search-magnify" href="/search/" data-analytics-click="prefix:t,prop3:Search apple.com" onclick="s_objectID=&quot;http://www.apple.com/search/_1&quot;;return this.s_oc?this.s_oc(e):true"><span className="gh-text-replace">Search apple.com</span></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <div className="collapse-nav">
          <div className="container">
            <a className="apple-studio-link" href="#/">
              <span className="pull-left logo"> <i className="fa fa-apple"></i> Studio</span>
            </a>  
            <span className="pull-right discover">
              <span>Discover</span> 
              <i className="fa fa-sort-desc open"></i> 
            </span>
          </div>
          <div className="container content">
            <h4 className="text-center">EXPLORE SESSSIONS:</h4>
            <div className="omigaze">I'm interested in _______________</div>
            <h4 className="text-center popular-topics">POPULAR TOPICS:</h4>
            <h4 className="text-center categories">PHOTOGRAPHY / RECORDING / FILM MAKING / MUSIC MAKING / DEVELOPING APPS</h4>
          </div>  
        </div>
      </div>  
    );
  }
});

module.exports = Navbar;
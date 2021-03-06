import React from "react";
import format from "date-fns/format";

import Jumbotron from "./components/jumbotron";

export default class PostPreview extends React.Component {
  render() {
    const {entry, getAsset} = this.props;
    let image = getAsset(entry.getIn(["data", "background"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
        image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }

    return <div>
        <Jumbotron image={image} title={entry.getIn(["data", "headline"])} subtitle={entry.getIn(["data", "subtitle"])} pre={entry.getIn(["data", "pre"])} cta={entry.getIn(["data", "cta"])}/>

        <div className="bg-white pv4">
          <div className="flex-ns mhn2-ns mb3">
            {(entry.getIn(["data", "items"]) || []).map((item, i) => <div className="ph2-ns w-30-ns" key={i}>
              <img src={getAsset(item.get("image"))} alt="" class="center db mb3" style="max-width:200px;"/>
              <h3>{item.get("subtitle")}</h3>
              <p>{item.get("text")}</p>
              <p>→ {item.get("cta")}</p>
            </div>)}
          </div>
        </div>


    </div>
  }
}
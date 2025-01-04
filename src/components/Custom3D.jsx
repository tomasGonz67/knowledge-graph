import ForceGraph3D from "react-force-graph-3d";
import myData from "./data.json";
import SpriteText from "three-spritetext";
import Navbar from "./Navbar";
const Custom3D = () => {
  return (
    <div>
      <Navbar />

      <div>
        <ForceGraph3D
          graphData={myData}
          nodeAutoColorBy="group"
          nodeThreeObject={(node) => {
            const sprite = new SpriteText(node.id);
            sprite.color = node.color;
            sprite.textHeight = 8;
            return sprite;
          }}
        />
      </div>
    </div>
  );
};

export default Custom3D;

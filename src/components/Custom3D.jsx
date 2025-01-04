import ForceGraph3D from 'react-force-graph-3d';
import myData from "./data.json"
import SpriteText from 'three-spritetext';
const Custom3D = () => {
    return (
        <div>
            <ForceGraph3D
  graphData={myData}
  nodeAutoColorBy="group"
  nodeThreeObject={node => {
    const sprite = new SpriteText(node.id);
    sprite.color = node.color;
    sprite.textHeight = 8;
    return sprite;
  }}
/>
            
        </div>
    );
}

export default Custom3D;

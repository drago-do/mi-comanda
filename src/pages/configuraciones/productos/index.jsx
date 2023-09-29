// import React from "react";
// import NavigationBar from "../../../components/NavigationBar";
// import { Container } from "@mui/material";
// import { obtenerCategorias } from "./../../../hooks/useCategorias";
// import { getProducts } from "./../../../hooks/useProductos";

// export default function productos() {
//   return (
//     <div className="h-screen pt-20">
//       <NavigationBar ownPathName="Configuraciones" />
//       <Container maxWidth="md">
//         <TreeNode />
//       </Container>
//     </div>
//   );
// }

// const TreeNode = ({ node }) => {
//   const nodeStyle = {
//     marginLeft: node.parent ? "20px" : "0", // Aplicar margen izquierdo para subnodos
//     fontWeight: "bold", // Texto en negrita para las categorías
//     color: node.parent ? "black" : "blue", // Color de texto diferente para las categorías principales
//   };

//   const renderTree = (node) => {
//     return (
//       <div style={nodeStyle} className="tree-node">
//         {node.name}
//         {node.products && (
//           <ul>
//             {node.products.map((product) => (
//               <li key={product._id}>{product.name}</li>
//             ))}
//           </ul>
//         )}
//         {node.children && (
//           <ul>
//             {node.children.map((child) => (
//               <li key={child._id}>{renderTree(child)}</li>
//             ))}
//           </ul>
//         )}
//       </div>
//     );
//   };

//   return <>{renderTree(node)}</>;
// };

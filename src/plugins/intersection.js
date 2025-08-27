import intersection from "../core/helpers/intersection.js";

function install (setup) {

  // Update gSVGObject
  setup.extendInstance({
    intersection
  });

  // Add template directive
  if (setup.extendTemplate) {
    setup.extendTemplate.defineDirective({
      name : 'g-intersection',
      exec (gObject, {expr, evalExpr, ctx}) {
        const ratio = evalExpr(expr, ctx);
        gObject.intersection(ratio);
      }
    });
  }
}

export default install;
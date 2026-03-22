export function mergeSortSteps(arr) {
  let steps = [];
  let comparisons = 0;
  // ✅ STEP 1: Build recursion tree FIRST
let nodeId = 0;

function buildTree(a, l, r) {
  if (l > r) return null;

  const node = {
    id: nodeId++,   // 🔥 UNIQUE ID
    value: a.slice(l, r + 1),
    left: null,
    right: null
  };

  if (l === r) return node;

  let mid = Math.floor((l + r) / 2);

  node.left = buildTree(a, l, mid);
  node.right = buildTree(a, mid + 1, r);

  return node;
}

  const treeRoot = buildTree(arr, 0, arr.length - 1);

  // ✅ STEP 2: Push initial tree
  steps.push({
    type: "tree",
    tree: treeRoot,
    message: "This is the full recursion tree of Merge Sort"
  });

  // ✅ STEP 3: Merge sort steps (NO tree array here)
function mergeSort(a, l, r, node) {
  // 🔥 STOP if node missing
  if (l >= r || !node) return;

  // 🔥 SAFE node usage
  steps.push({
    type: "tree",
    tree: treeRoot,
    activeNode: node?.id,
    message: `Processing [${a.slice(l, r + 1)}]`
  });

  let mid = Math.floor((l + r) / 2);

  // 🔥 ONLY call if child exists
  if (node.left) {
    mergeSort(a, l, mid, node.left);
  }

  if (node.right) {
    mergeSort(a, mid + 1, r, node.right);
  }

  // 🔥 Array step before merge
  steps.push({
    type: "array",
    array: [...a],
    message: `Merging [${a.slice(l, r + 1)}]`
  });

  merge(a, l, mid, r);
}

  function merge(a, l, m, r) {
    let temp = [];
    let i = l, j = m + 1;

    while (i <= m && j <= r) {
      comparisons++;
      steps.push({
        type: "compare",
        array: [...a],
        active: [i, j],
        message: `Comparing ${a[i]} and ${a[j]}`
      });

      if (a[i] < a[j]) temp.push(a[i++]);
      else temp.push(a[j++]);
    }

    while (i <= m) temp.push(a[i++]);
    while (j <= r) temp.push(a[j++]);

    for (let k = l; k <= r; k++) {
      a[k] = temp[k - l];

      steps.push({
        type: "merge",
        array: [...a],
        active: [k],
        message: `Placing ${a[k]} at correct position`,
        metrics: {
             comparisons
        }
      });
    }
  }

  mergeSort(arr, 0, arr.length - 1,treeRoot);

  return steps;
}
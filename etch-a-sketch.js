const container_el = document.getElementById("container");
const create_grid_button = document.getElementById("create-grid");

let create_button_visible = undefined;

create_grid(16, 16);

create_grid_button.addEventListener("click", () => create_grid_from_input());

function prompt_for_dimensions() {
  let x = 16;
  let y;

  const prompt_text = `Enter desired width and height using 'width[,height]' syntax.
If height is omitted, width will be used for both x- and y-axis.
Both width and height must be in range 1 <= x <= 100.
Invalid inputs will default to a 16x16 grid. This includes inputs with more than 2 parameters`;
  const input = prompt(prompt_text);
  if (input == "" || input == null) return [x, x];

  const split = input.split(",").map((x) => +x);
  if (
    split.length > 2 ||
    split.some((x) => x == NaN || out_of_range(x, 1, 100))
  )
    return [x, x];

  x = split[0];
  y = split.length == 1 ? split[0] : split[1];
  return [x, y];
}

function out_of_range(val, min, max) {
  return val < min ? true : val > max ? true : false;
}

function create_grid(width, height) {
  // clear children
  container_el.replaceChildren();

  for (let i = 0; i < height; i++) {
    const col = create_div("col");
    container_el.appendChild(col);

    for (let j = 0; j < width; j++) {
      const row = add_hover_effect(create_div("row"));
      col.appendChild(row);
    }
  }
}

function create_div(...classes) {
  const el = document.createElement("div");

  for (let i = 0; i < classes.length; i++) {
    el.classList.add(classes[i]);
  }

  return el;
}

function add_hover_effect(element) {
  element.onmouseenter = (e) => on_hover(e.target);
  return element;
}

function on_hover(element) {
  const opacity = element.style.opacity == "" ? 1 : +element.style.opacity;
  if (+opacity <= 0) return;

  const hue = Math.random() * 360;
  const saturation = Math.random() * 40 + 60;
  element.style.backgroundColor = `hsl(${hue}, ${saturation}%, 50%)`;
  element.style.opacity = opacity - 0.1;
}

function create_grid_from_input() {
  const input = prompt_for_dimensions();
  create_grid(input[0], input[1]);
}

document.addEventListener("mousemove", (e) => {
  if (!create_button_visible && e.clientY <= window.innerHeight / 8) {
    set_create_button_visible(true);
  } else if (create_button_visible && e.clientY > window.innerHeight / 8) {
    set_create_button_visible(false);
  }
});

function set_create_button_visible(is_visible) {
  if (create_button_visible == undefined) {
    create_grid_button.classList.add("fade-in");
  } else {
    create_grid_button.classList.toggle("fade-in");
    void create_grid_button.offsetHeight;
    create_grid_button.classList.toggle("fade-out");
  }

  create_button_visible = is_visible;
}

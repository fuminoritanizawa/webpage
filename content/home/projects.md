+++
widget = "portfolio"
headless = false
active = true
weight = 45

title = "Projects"

[content]
  page_type = "project"
  filter_default = 0

  [[content.filter_button]]
    name = "All"
    tag = "*"

  [[content.filter_button]]
    name = "Genetics"
    tag = "Genetics"

  [[content.filter_button]]
    name = "Immunology"
    tag = "Immunology"

  [[content.filter_button]]
    name = "Behavior"
    tag = "Behavior"

[design]
  columns = "1"
  view = 3
  flip_alt_rows = true

[design.background]

[advanced]
  css_style = ""
  css_class = ""
+++

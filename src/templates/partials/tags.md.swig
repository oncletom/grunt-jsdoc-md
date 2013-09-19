{% for tag in tags -%}
{% if tag.types and tag.name -%}
* `@{{ tag.type }}` `{{ tag.name }}` `{{ tag.types | join(' | ') | safe }}` {{ tag.description }}
{% elseif tag.types -%}
* `@{{ tag.type }}` `{{ tag.types | join(' | ') | safe }}` {{ tag.description }}
{% elseif tag.url -%}
* See: [{{ tag.url }}]({{ tag.url}})
{% elseif tag.local -%}
* See: `{{ tag.local }}`
{% elseif tag.name -%}
* `@{{ tag.type }}` `{{ tag.name }}`
{% else -%}
* `@{{ tag.type }}`
{% endif -%}
{% endfor %}
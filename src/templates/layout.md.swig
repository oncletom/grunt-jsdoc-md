{% for comment in comments -%}
# {{ comment.ctx.string | default("?") }}

{% include "./partials/params.md.swig" with {tags: comment.params} only %}
{% include "./partials/tags.md.swig" with {tags: comment.tags} only %}

> {{ comment.description.full | replace('\\n', "\n", 'g') | safe }}
{% endfor %}
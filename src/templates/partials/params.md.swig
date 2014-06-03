{% if tags and tags.length -%}
<table>
  {% for tag in tags %}<tr>
    <th><code>{{ tag.name }}</code></th>
    <td><code>{{ tag.types | join('</code> | <code>') | safe }}</code></td>
    <td>{{ tag.description }}</td>
  </tr>{% endfor %}
</table>
{% endif %}
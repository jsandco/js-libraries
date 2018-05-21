import React, { Component }   from 'react';
import Button               from '/imports/components/semantic/Button';
import Form                 from '/imports/components/semantic/Form';
import Input                from '/imports/components/semantic/Input';
import _                    from 'lodash';

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    const { increment, page } = props;
    this.state = {
      forced_page: increment ? page + 1 : page,
    };
  }

  componentWillReceiveProps(new_props) {
    let { increment, page } = new_props;
    page = _.toNumber(page);
    this.setState({ forced_page: increment ? page + 1 : page });
  }

  change_page(page, e) {
    e.preventDefault();

    this.props.onPageClick(this.props.increment ? page - 1 : page);
  }

  change_page_forced(e) {
    e.preventDefault();
    const { increment } = this.props;
    const { forced_page } = this.state;
    this.props.onPageClick(increment ? forced_page - 1 : forced_page);
  }

  handleChange(attr, e) {
    const state = this.state;
    state[attr] = e.target.value;
    this.setState(state);
  }

  render() {
    const { increment } = this.props;
    let { page, total_pages } = this.props;
    let { forced_page } = this.state;
    total_pages = _.toNumber(total_pages);
    page = _.toNumber(page);
    forced_page = _.toNumber(forced_page);
    if (increment) {
      page += 1;
    }

    if (page < 1) {
      page = 1;
    }
    if (page > total_pages) {
      page = total_pages;
    }
    let nb_less_buttons = 2;
    let nb_upper_buttons = 2;
    if (page < 3) {
      nb_less_buttons = page % 3;
      nb_upper_buttons = 5 - (page % 3);
    }
    if (page >= (total_pages - 1)) {
      nb_less_buttons = 4 - (total_pages - page);
      nb_upper_buttons = (total_pages - page) % 3;
    }


    if (window.innerWidth <= 768) {
      return (
        <Button.Group size="small" floated={this.props.floated}>
          <Button color="blue" disabled={page <= 1} icon="angle left" onClick={(e) => { this.change_page(page - 1, e); }} />
          <Form onSubmit={(e) => { this.change_page_forced(e); }}>
            <Form.Field>
              <Input max={total_pages} min={1} value={forced_page} type="number" label={`/${total_pages}`} labelPosition="right" onChange={(e) => { this.handleChange('forced_page', e); }} />
            </Form.Field>
          </Form>
          <Button color="blue" disabled={page == total_pages} onClick={(e) => { this.change_page(page + 1, e); }} icon="angle right" />
        </Button.Group>
      );
    }
    return (
      <Button.Group size="tiny" floated={this.props.floated}>
        <Button color="blue" disabled={page <= 4} icon="angle double left" onClick={(e) => { this.change_page(1, e); }} />
        <Button color="blue" disabled={page <= 1} icon="angle left" onClick={(e) => { this.change_page(page - 1, e); }} />
        {page - 10 > 0 ?
          <Button onClick={(e) => { this.change_page(page - 10, e); }}>{page - 10}...</Button>
          : ''}
        {_.times(nb_less_buttons, (index) => {
            if (page - nb_less_buttons + index > 0) {
              return <Button key={index} onClick={(e) => { this.change_page(page - nb_less_buttons + index, e); }}>{page - nb_less_buttons + index}</Button>;
            }
          })}
        <Button active>{page}</Button>
        {_.times(nb_upper_buttons, (index) => {
            if (page + index < total_pages) {
              return <Button key={index} onClick={(e) => { this.change_page(page + index + 1, e); }}>{page + index + 1}</Button>;
            }
          })}
        {page + 10 <= total_pages ?
          <Button onClick={(e) => { this.change_page(page + 10, e); }}>...{page + 10}</Button>
          : ''}
        <Button color="blue" disabled={page == total_pages} onClick={(e) => { this.change_page(page + 1, e); }} icon="angle right" />
        <Button color="blue" disabled={page + 2 >= total_pages} onClick={(e) => { this.change_page(total_pages, e); }} icon="angle double right" />
        {total_pages > 1 ?
          <Form size="tiny" onSubmit={(e) => { this.change_page_forced(e); }}>
            <Form.Field>
              <Input max={total_pages} min={1} value={forced_page} type="number" label={`/${total_pages}`} labelPosition="right" onChange={(e) => { this.handleChange('forced_page', e); }} />
            </Form.Field>
          </Form>
          : ''}
      </Button.Group>
    );
  }
}

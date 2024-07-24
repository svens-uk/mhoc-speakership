module.exports = {
    first_reading: {
        key: 'first_reading',
        title: '1st Reading',
        post_to: 'mhoc',
        options: [
            'second_reading'
        ],
        final: false
    },
    second_reading: {
        key: 'second_reading',
        title: '2nd Reading',
        post_to: 'mhoc',
        options: [
            'second_reading_vote'
        ],
        final: false,
        format: `**Order, order!**

***

# {{ bill_title }}

{{ bill_text }}

This reading ends {{ closing_date }} at 10pm {{ timezone }}.
`
    },
    second_reading_vote: {
        key: 'second_reading_vote',
        title: '2nd Reading Vote',
        post_to: 'mhocmp',
        options: [
            'pass',
            'fail',
            'committee',
            'amendment_vote',
            'third_reading'
        ],
        final: false,
        format: `**Division! Clear the lobby.**

***

# {{ bill_title }}

{{ bill_text }}

This division ends {{ closing_date }} at 10pm {{ timezone }}.

Vote Aye, No, or Abstain.`
    },
    committee: {
        key: 'committee',
        title: 'Committee Stage',
        post_to: 'mhoc',
        options: [
            'committee_vote',
            'amendment_vote',
            'third_reading',
            'third_reading_vote'
        ],
        final: false
    },
    committee_vote: {
        key: 'committee_vote',
        title: 'Committee Vote',
        post_to: 'mhoc',
        options: [
            'amendment_vote',
            'third_reading'
        ],
        final: false
    },
    amendment_vote: {
        key: 'amendment_vote',
        title: 'Amendment Vote',
        post_to: 'mhoccmtevote',
        options: [
            'third_reading',
        ],
        final: false
    },
    third_reading: {
        key: 'third_reading',
        title: '3rd Reading',
        post_to: 'mhoc',
        options: [
            'third_reading_vote'
        ],
        final: false
    },
    third_reading_vote: {
        key: 'third_reading_vote',
        title: '3rd Reading Vote',
        post_to: 'mhocmp',
        options: [
            'pass',
            'fail'
        ],
        final: false
    },
    pass: {
        title: 'Royal Assent',
        post_to: 'mhoc',
        final: true
    },
    fail: {
        title: 'Bill Failed',
        final: true
    },
    withdrawn: {
        title: 'Notice of Withdrawal',
        final: true
    }
}
